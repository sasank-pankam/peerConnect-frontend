import { useContext } from "react";
import { UsersContext, useUser } from "../contexts/UsersContextProvider";
// import { contentSender } from "../utils/ContentSenderObject";
// import consts from '../Constants';

function HeaderPane() {
  /**
   * @type {import('../contexts/UsersContextProvider').UserContextValue}
   */
  const { owner, currentActiveUser, userDetails } = useUser();
  return (
    <div className="header-container">
      <div className="my-user-name">{owner.USER.name}</div>
      <div className="current-username">
        {currentActiveUser !== null && userDetails[currentActiveUser].name}
      </div>
    </div>
  );
}

export default HeaderPane;

/*
 
 */
