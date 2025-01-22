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

const test = () => {
  const [lis, setLis] = useState([9, 8, 7, 6, 5, 4, 3, 2, 1]);
  console.log("sodi");
  return (
    <>
      <div onClick={() => setLis([lis[0] + 1, ...lis])}> add</div>
      <AutoSizer
        style={{
          height: "100vh",
          width: "100vw",
          backgroundColor: "red",
        }}
      >
        {({ height, width }) => {
          return (
            <FixedSizeList
              height={height}
              width={width}
              itemCount={lis.length}
              itemSize={50}
              initialScrollOffset={lis.length * 50}
            >
              {({ index, style }) => {
                return <div style={style}> item - {lis[index]} </div>;
              }}
            </FixedSizeList>
          );
        }}
      </AutoSizer>
    </>
  );
};
export default App;
