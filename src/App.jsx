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
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";
import { useState } from "react";

const App = () => {
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
