import { useContext, useMemo, useState, useRef } from "react";
import UserBox from "./UserBox";
import { UsersContext, useUser } from "../contexts/UsersContextProvider";
import Search from "../assets/search.jsx";

import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { useInteraction } from "../contexts/InteractionContextProvider.jsx";

/*

  user data received 
  {
    ip: _,
    name: _,
    peerId: _,
  }
  */

const ActiveMembers = () => {
  // needed states
  const [searchValue, setSearchValue] = useState("");
  /**
   * @type {import('../contexts/UsersContextProvider').UserContextValue}
   */
  const { users, userDetails } = useUser();
  const { isPinned } = useInteraction();
  const inputRef = useRef(null);
  // search functionality
  let searchTimeout;
  const changeSearchValue = (e) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    searchTimeout = setTimeout(() => {
      setSearchValue(e.target.value);
    }, 200);
  };

  // filter users based on search
  const filteredUsers = useMemo(() => {
    // console.log('ran search');
    searchValue && console.log("::searched for ", searchValue);
    return users.filter(({ peerId: userId }) => {
      if (!userDetails[userId]) return false;
      return userDetails[userId].name
        .toLowerCase()
        .includes(searchValue.toLowerCase());
    });
  }, [searchValue, users]);

  const pinnedUsers = filteredUsers
    .filter(({ peerId }) => isPinned.get(peerId))
    .sort((a, b) => {
      return isPinned.get(b.peerId) - isPinned.get(a.peerId);
    });

  const sortedUsers = [
    ...pinnedUsers,
    ...filteredUsers.filter(
      ({ peerId }) => !isPinned.get(peerId),
    ) /* Nonpinned users */,
  ];

  // console.log('sorted users : ', sortedUsers);

  return (
    <>
      <div
        className="user  scrollbar-dummy"
        style={{
          background: "transparent",
        }}
      >
        <input
          type="text"
          className="user rounded-md pb-0"
          onChange={changeSearchValue}
          defaultChecked={searchValue}
          placeholder="Search"
          ref={inputRef}
        />
        <div
          className="search"
          onClick={() => {
            inputRef.current.focus();
          }}
        >
          <Search />
        </div>
      </div>
      <div className="activemembers">
        <AutoSizer>
          {({ height, width }) => {
            return (
              <List
                height={height}
                width={width}
                itemCount={sortedUsers.length}
                itemSize={50}
              >
                {({ index, style }) => {
                  const { peerId } = sortedUsers[index];
                  return (
                    <div style={style}>
                      <UserBox
                        id={peerId}
                        isPinned={isPinned.get(peerId)}
                        style={style}
                        userName={userDetails[peerId].name}
                        key={index} // for react
                      />
                    </div>
                  );
                }}
              </List>
            );
          }}
        </AutoSizer>
      </div>
    </>
  );
};

export default ActiveMembers;

/*

        <AutoSizer>
          {({ width, height }) => {
            return (
              <List
                width={width}
                height={height}
                deferredMeasurementCache={cache.current}
                rowCount={sortedUsers.length}
                rowHeight={cache.current.rowHeight}
                rowRenderer={({ key, index, style, parent }) => {
                  const { id } = sortedUsers[index];
                  return (
                    <CellMeasurer
                      key={key}
                      cache={cache.current}
                      parent={parent}
                      columnIndex={0}
                      rowIndex={index}
                    >
                      <div style={style}>
                        <UserBox
                          id={id}
                          key={key}
                          isPinned={isPinned.get(id)}
                          // style={style}
                          userName={userDetails[id].name}
                        />
                      </div>
                    </CellMeasurer>
                  );
                }}
              />
            );
          }}
        </AutoSizer>


*/

// const ActiveMembers = () => {
//   const cache = useRef(
//     new CellMeasurerCache({
//       fixedWidth: true,
//       fixedHeight: false,
//       defaultHeight: 45,
//     })
//   );

//   const [searchValue, setSearchValue] = useState("");
//   const { users, userDetails, isPinned } = useContext(UsersContext);
//   const inputRef = useRef(null);
//   let searchTimeout;
//   const changeSearchValue = (e) => {
//     if (searchTimeout) {
//       clearTimeout(searchTimeout);
//     }
//     searchTimeout = setTimeout(() => {
//       setSearchValue(e.target.value);
//     }, 200);
//   };

//   const filteredUsers = useMemo(() => {
//     searchValue && console.log("::searched for ", searchValue);
//     return users.filter(({ id: userId }) => {
//       if (!userDetails[userId]) return false;
//       return userDetails[userId].name
//         .toLowerCase()
//         .includes(searchValue.toLowerCase());
//     });
//   }, [searchValue, users]);

//   const pinnedUsers = filteredUsers
//     .filter(({ id }) => isPinned.get(id))
//     .sort((a, b) => {
//       return isPinned.get(b.id) - isPinned.get(a.id);
//     });

//   const sortedUsers = [
//     ...pinnedUsers,
//     ...filteredUsers.filter(
//       ({ id }) => isPinned.get(id) == undefined
//     ) /* Nonpinned users */,
//   ];

//   // console.log(sortedUsers);

//   return (
//     <>
//       <div className="user scrollbar-dummy">
//         <input
//           type="text"
//           className="user rounded-md pb-0"
//           onChange={changeSearchValue}
//           defaultChecked={searchValue}
//           placeholder="Search"
//           ref={inputRef}
//         />
//         <div
//           className="search"
//           onClick={() => {
//             inputRef.current.focus();
//           }}
//         >
//           <svg
//             viewBox="0 0 24 24"
//             height="24"
//             width="24"
//             preserveAspectRatio="xMidYMid meet"
//             className="search"
//             version="1.1"
//             x="0px"
//             y="0px"
//             enableBackground="new 0 0 24 24"
//           >
//             <title>search</title>
//             <path
//               fill="currentColor"
//               d="M15.009,13.805h-0.636l-0.22-0.219c0.781-0.911,1.256-2.092,1.256-3.386 c0-2.876-2.332-5.207-5.207-5.207c-2.876,0-5.208,2.331-5.208,5.207s2.331,5.208,5.208,5.208c1.293,0,2.474-0.474,3.385-1.255 l0.221,0.22v0.635l4.004,3.999l1.194-1.195L15.009,13.805z M10.201,13.805c-1.991,0-3.605-1.614-3.605-3.605 s1.614-3.605,3.605-3.605s3.605,1.614,3.605,3.605S12.192,13.805,10.201,13.805z"
//             ></path>
//           </svg>
//         </div>
//       </div>
//       <div className="activemembers">
//         <AutoSizer>
//           {({ width, height }) => {
//             return (
//               <List
//                 width={width}
//                 height={height}
//                 // rowHeight={45}
//                 rowHeight={cache.current.rowHeight}
//                 deferredMeasurementCache={cache.current}

//                 rowCount={sortedUsers.length}
//                 rowRenderer={({ key, index, style, parent }) => {
//                   const { id } = sortedUsers[index];
//                   // console.log('::id is - ', id);
//                   return (
//                     <UserBox id={id} key={key} style={style} userName={userDetails[id].name} />
//                   );
//                 }}
//               />
//             );
//           }}
//         </AutoSizer>
//       </div>
//     </>
//   );
// };

// import React, { useRef, useState, useContext } from 'react';
// import { AutoSizer, List, CellMeasurerCache } from 'react-virtualized';
// import UserBox from './UserBox'; // Make sure to import the UserBox component
