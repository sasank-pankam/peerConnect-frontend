import Start from "./components/Start.jsx";
import { IdCounterProvider } from "./contexts/IdCounterContextProvider.jsx";

import { WebSocketProvider } from "./contexts/WebSocketContextProvider.jsx";
import "./App.css";
import { UsersProvider } from "./contexts/UsersContextProvider.jsx";
import { OwnershipProvider } from "./contexts/OwnershipCContextProvider.jsx";
import { InteractionProvider } from "./contexts/InteractionContextProvider.jsx";
import { ActiveUserProvider } from "./contexts/ActitveUserContextProvider.jsx";
import { MetaDataProvider } from "./contexts/MetadataContextProvider.jsx";
import { UiStateProvider } from "./contexts/UiStateContextProvider.jsx";
import { useState } from "react";
import { Directory } from "./components/TransferBox/Directory.jsx";

const testMessage = {
  time: new Date().toUTCString(),
  isSender: true,
  content: {
    name: "parent -1",
    items: {
      name: "parent - 1",
      files: [
        { name: "file-1", percentage: 50 },
        { name: "file-2", percentage: 60 },
      ],
      directories: [
        {
          name: "subdir -1",
          files: [],
          directories: [
            {
              name: "subdir-2",
              files: [{ name: ".gitkeep", percentage: 100 }],
              directories: [],
            },
          ],
        },
        {
          name: "subdir-3",
          files: [],
          directories: [{ name: "empty dir", files: [], directories: [] }],
        },
      ],
    },
  },
};

const App = () => {
  const [mess, setMess] = useState(testMessage);
  return (
    <WebSocketProvider>
      <IdCounterProvider>
        <UsersProvider>
          <OwnershipProvider>
            <InteractionProvider>
              <ActiveUserProvider>
                <MetaDataProvider>
                  <UiStateProvider>
                    <Start />
                  </UiStateProvider>
                </MetaDataProvider>
              </ActiveUserProvider>
            </InteractionProvider>
          </OwnershipProvider>
        </UsersProvider>
      </IdCounterProvider>
    </WebSocketProvider>
  );
};

export default App;
// <Directory setMess={setMess} Messsage={mess} />
