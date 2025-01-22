import { useContext } from "react";
import { UsersContext, useUser } from "../contexts/UsersContextProvider";
import { useActiveUser } from "../contexts/ActitveUserContextProvider";
import { useOwner } from "../contexts/OwnershipCContextProvider";
// import { contentSender } from "../utils/ContentSenderObject";
// import consts from '../Constants';

function HeaderPane() {
  /**
   * @type {import('../contexts/UsersContextProvider').UserContextValue}
   */
  const { owner } = useOwner();
  const { userDetails } = useUser();
  const { currentActiveUser } = useActiveUser();
  return (
    <div className="header-container">
      <div className="my-user-name">{owner?.USER.name}</div>
      <div className="current-username">
        {currentActiveUser !== null && userDetails[currentActiveUser]?.name}
      </div>
    </div>
  );
}

export default HeaderPane;

/*
 
 */
