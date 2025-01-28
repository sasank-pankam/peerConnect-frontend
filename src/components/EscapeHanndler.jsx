class EscapeHandler {
  constructor() {
    this.stack = [];
    this.setfunc = null;
  }
  update() {
    document.removeEventListener("keydown", this.setfunc);
    this.setfunc = (event) => {
      if (
        event.key === "Escape" ||
        event.key === "Esc" ||
        event.keyCode === 27
      ) {
        this.stack[this.stack.length - 1]();
      }
    };
    document.addEventListener("keydown", this.setfunc);
  }
  add(escapeHandler) {
    this.stack.push(escapeHandler);
    console.log("setting a escape handler", escapeHandler);
    this.update();
  }
  remove() {
    const removed = this.stack.pop();
    console.log("removing escape handler", removed);
    this.update();
  }
}

export const setEscape = new EscapeHandler();
