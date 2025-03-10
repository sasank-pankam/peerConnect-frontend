import { useState } from "react";
import { Popup } from "./PopUp.jsx";
import { useWebSocket } from "../contexts/WebSocketContextProvider.jsx";
import { useOwner } from "../contexts/OwnershipCContextProvider.jsx";
import Profile from "./Profile.jsx";
import { useEffect } from "react";
import { getSelectedProfileWithAttribute } from "../utils/actions.js";
import useGetProfiles from "../utils/manageProfiles.js";
import { sendProfiles } from "../utils/manageProfiles.js";

import {
  askAndAddProfile,
  askAndRemoveProfile,
} from "../utils/ProfileMutations.js";

const PROFILESINDEX = 1;
const LoadProfiles = ({ setClicked }) => {
  const [profiles, setProfiles] = useGetProfiles();
  const [msgId, profilesArray, interfacesArray] = profiles;
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    const profileName = getSelectedProfileWithAttribute(profilesArray);
    if (profileName) {
      setProfiles((prevProfiles) => {
        const currProfiles = prevProfiles[PROFILESINDEX]; // position of profiles array [ id, profiles, interfaces ]
        delete currProfiles[profileName].selected;
        return [...prevProfiles];
      });
    }
    setSelectedProfile(profileName);
  }, [profilesArray]);
  console.debug(profiles);

  const { sender } = useWebSocket();

  const { setOwner } = useOwner();

  const clicked = ({ selectedProfile, profilesArray }) => {
    setOwner(profilesArray[selectedProfile]);
    if (!("if_name" in profilesArray[selectedProfile].INTERFACE)) {
      alert("Select a interface");
      return;
    }
    console.debug("sending profiles", profilesArray);
    sendProfiles(profilesArray, selectedProfile, sender, msgId);
    setClicked(true);
  };

  return (
    <div className="profiles-contianer flex flex-col gap-10 justify-center items-center">
      <div className="profiles flex gap-10">
        {profilesArray &&
          Object.keys(profilesArray).map((profileName, index) => {
            return (
              <Profile
                setProfiles={setProfiles}
                profile={profilesArray[profileName]}
                profileName={profileName}
                interfaces={interfacesArray}
                onClick={() => {
                  setSelectedProfile((prev) => {
                    if (prev == profileName) {
                      return null;
                    }
                    return profileName;
                  });
                }}
                isSelectedProfile={selectedProfile === profileName}
                key={index}
              />
            );
          })}
        <div className="w-full flex flex-col gap-4 justify-center items-center h-full">
          <div className="profile-controls flex gap-10 justify-center items-center">
            <div
              onClick={() => askAndAddProfile(setProfiles)}
              className="add cursor-pointer"
            >
              Add
            </div>
            <div
              onClick={() => {
                askAndRemoveProfile(selectedProfile, setProfiles);
                setSelectedProfile(null);
              }}
              className="remove cursor-pointer"
            >
              Remove
            </div>
          </div>
          <div className="flex justify-center">
            <div
              className="flex justify-center items-center px-5 py-2 bg-gray-300 rounded-2xl w-fit cursor-pointer"
              onClick={() => {
                if (!selectedProfile) {
                  alert("select a profile");
                  return;
                }
                clicked({
                  selectedProfile,
                  profilesArray,
                });
              }}
            >
              proceed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadProfiles;
