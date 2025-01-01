import { useContext } from "react";
import { UsersContext, useUser } from "../contexts/UsersContextProvider";
import UserChatContainer from "./UserChatContainer";
import IntroAboutApplication from "./IntroAboutApplication.jsx";

function UserChatContainersWrapper() {
  /**
   * @type {import('../contexts/UsersContextProvider').UserContextValue}
   */
  const { currentActiveUser } = useUser();
  return (
    <>
      {currentActiveUser === null ? (
        <IntroAboutApplication />
      ) : (
        <UserChatContainer id={currentActiveUser} key={currentActiveUser} />
      )}
    </>
  );
}

export default UserChatContainersWrapper;

// import React, { createContext, useContext, useState, useEffect } from 'react';

// // Create a context to store the list of users
// const UsersContext = createContext();

// // Custom hook to access the context
// const useUsers = () => useContext(UsersContext);

// // Component to provide the context and manage the state
// const UsersProvider = ({ children }) => {
//   const [users, setUsers] = useState([]);
//   // State to keep track of whether the element has been rendered for each user
//   const [elementRendered, setElementRendered] = useState({});

//   // Function to add a new user to the list
//   const addUser = (user) => {
//     setUsers([...users, user]);
//   };

//   // Function to check if the element has been rendered for a user
//   const hasElementRendered = (userId) => {
//     return !!elementRendered[userId];
//   };

//   useEffect(() => {
//     // Example of checking if the element has been rendered for the first user
//     if (!hasElementRendered(users[0]?.id)) {
//       // Render the element for the first user
//       console.log('Element rendered for user:', users[0]?.name);
//       // Update the state to mark the element as rendered for the first user
//       setElementRendered({ ...elementRendered, [users[0]?.id]: true });
//     }
//   }, [users, elementRendered]);

//   return (
//     <UsersContext.Provider value={{ users, addUser, hasElementRendered }}>
//       {children}
//     </UsersContext.Provider>
//   );
// };

// // Example component that renders the element conditionally
// const MyComponent = () => {
//   const { users, hasElementRendered } = useUsers();

//   return (
//     <div>
//       {users.map((user) => (
//         <div key={user.id}>
//           {/* Render the element only if it hasn't been rendered for this user */}
//           {!hasElementRendered(user.id) && <p>This element is rendered once for {user.name}</p>}
//           {/* Other content */}
//           <p>Other content for {user.name}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// // Example usage of the context provider
// const App = () => {
//   return (
//     <UsersProvider>
//       <MyComponent />
//     </UsersProvider>
//   );
// };

// export default App;
