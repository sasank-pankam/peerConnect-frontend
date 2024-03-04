import {createContext, useEffect, useState} from "react";

export const UsersContext = createContext();

const SetEscape = (escapeHandler) => {
    useEffect(() => {
        document.addEventListener("keydown", escapeHandler);
        return () => {
            document.removeEventListener("keydown", escapeHandler);
        };
    }, [escapeHandler]);
}

export const UsersProvider = ({children}) => {
    const listOfusers = [];
    const userDedatils = {};
    const userCounts = {};
    const timeStamps = {};
    const positions = new Map();


    for (let i = 0; i < 9; i++) {
        listOfusers.push({
            id: i,
        });
        userDedatils[i] = {
            name: `user ${i}`,
            // anything to be added here for user details later
        };
        userCounts[i] = 0;
        timeStamps[i] = 0;
        positions.set(i, 0);
        // renderebles.push(i);
    }

    const [users, setUsers] = useState(listOfusers);
    const [userDetails, setUserDetails] = useState(userDedatils);
    const [counts, setCounts] = useState(userCounts);
    const [isPinned, setIsPinned] = useState(new Map());
    const [currentActiveUser, setCurrentActiveUser] = useState(0); // change to null later
    const [owner, setOwner] = useState("Me");
    const [latestTimeStampOfUserMessages, setLatestTimeStampOfUserMessages] =
        useState({});
    const [currentPositions, setCurrentPositions] = useState(positions);
    const [isVisible, setIsVisible] = useState({
        visibility: false,
        id: null,
        position: {x: 0, y: 0},
    });
    const [youBlocked, setYouBlocked] = useState(new Set());
    const [blockedYou, setBlockedYou] = useState(new Set());

    const escapeHandler = (event) => {
        if (
            event.key === "Escape" ||
            event.key === "Esc" ||
            event.keyCode === 27 ||
            (event.key === "Meta" && event.code === "MetaLeft")
        ) {
            console.log("Escape pressed");
            setCurrentActiveUser(null);
        }
    };

    SetEscape(escapeHandler);
    const addUser = (id, details = {name: `name not set for ${id}`}) => {
        // console.log(users);
        // console.log(users.find((user) => user.id === id));
        if (users.find((user) => user.id === id) !== undefined) {
            console.log("User already exists");
            return;
        }
        setUsers((prevUsers) => {
            return [...prevUsers, {id: id}];
        });
        setUserDetails((prevDetails) => {
            return {...prevDetails, [id]: details};
        });
    };

    const removeUser = (id) => {
        let found = false;
        setUsers((prevUsers) => {
            return prevUsers.filter((user) => {
                if (user.id === id) found = true;
                return user.id !== id;
            });
        });
        if (!found) {
            console.log("User not found");
            return;
        }
        setUserDetails((prevDetails) => {
            const temp = {...prevDetails};
            delete temp[id];
            return temp;
        });
    };
    const value = {
        users,
        setUsers,

        currentActiveUser,
        setCurrentActiveUser,

        userDetails,
        setUserDetails,

        counts,
        setCounts,

        isPinned,
        setIsPinned,

        owner,
        setOwner,

        latestTimeStampOfUserMessages,
        setLatestTimeStampOfUserMessages,

        currentPositions,
        setCurrentPositions,

        isVisible,
        setIsVisible,

        youBlocked,
        setYouBlocked,

        blockedYou,
        setBlockedYou,

        addUser,
        removeUser,
    };
    return (
        <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
    );
};
