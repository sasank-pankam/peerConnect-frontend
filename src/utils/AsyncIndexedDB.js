export class AsyncDB {
  constructor(dbName, store) {
    this.dbName = dbName;
    this.store = store;
  }

  open() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        if (db.objectStoreNames.contains(this.store.name)) {
          db.deleteObjectStore(this.store.name);
        }

        const storeInstance = db.createObjectStore(this.store.name, {
          keyPath: this.store.keyPath || "id",
        });

        const indices = this.store.indices;

        storeInstance.createIndex(indices.name, indices.keyPath, {
          unique: true,
        });
      };
    });
  }

  async withStore(mode, callback) {
    const db = await this.open();
    const transaction = db.transaction(this.store.name, mode);
    const store = transaction.objectStore(this.store.name);

    return new Promise((resolve, reject) => {
      transaction.onerror = () => reject(transaction.error);
      callback(store, resolve);
    });
  }

  async add(value) {
    return this.withStore("readwrite", (store, resolve) => {
      const request = store.add(value);
      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
      request.onerror = () => resolve(null); // this will skip the insertion when a item with same primary key is added.
    });
  }

  async delete(keyPath) {
    return this.withStore("readwrite", (store, resolve) => {
      const req = store.delete(keyPath);
      req.onsuccess = () => resolve(true);
    });
  }

  async get(indexName, key) {
    return this.withStore("readonly", (store, resolve) => {
      const index = store.index(indexName);
      const request = index.get(key);

      request.onsuccess = (event) => resolve(event.target.result);
    });
  }

  async getRange(indexName, from, to) {
    return this.withStore("readonly", (store, resolve) => {
      const index = store.index(indexName);
      const range = IDBKeyRange.bound(from, to);
      const request = index.openCursor(range);

      const results = [];
      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          results.push(cursor.value);
          cursor.continue();
        } else {
          resolve(results);
        }
      };
    });
  }

  async getAll() {
    return this.withStore("readonly", (store, resolve) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
    });
  }

  async delete(key) {
    return this.withStore("readwrite", (store, resolve) => {
      store.delete(key);
      resolve();
    });
  }

  destroy() {
    indexedDB.deleteDatabase(this.dbName);
  }

  async count() {
    return this.withStore("readonly", (store, resolve) => {
      const request = store.count();
      request.onsuccess = () => resolve(request.result);
    });
  }
}
