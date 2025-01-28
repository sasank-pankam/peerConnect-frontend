import { useState } from "react";
import { useWebSocket } from "../contexts/WebSocketContextProvider.jsx";
import { useOwner } from "../contexts/OwnershipCContextProvider.jsx";
import Profile from "./Profile.jsx";
import { useEffect } from "react";
import { getSelectedProfileWithAttribute } from "../utils/actions.js";
import useGetProfiles from "../utils/manageProfiles.js";

import {
  askProfile,
  askAndAddProfile,
  askAndRemoveProfile,
} from "../utils/ProfileMutations.js";

const LoadProfiles = ({ setClicked }) => {
  const [profiles, setProfiles] = useGetProfiles();
  const [msgId, profilesArray] = profiles;
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    const profileName = getSelectedProfileWithAttribute(profilesArray);
    if (profileName) {
      setProfiles((prevProfiles) => {
        const [id, currProfiles] = prevProfiles;
        delete currProfiles[profileName].selected;
        return [id, currProfiles];
      });
    }
    setSelectedProfile(profileName);
  }, [profilesArray]);

  const { sender } = useWebSocket();

  const { setOwner } = useOwner();

  const onClick = ({ selectedProfile, profiles }) => {
    setOwner(profiles[selectedProfile]);
    console.log("sending profiles", profiles);
    sendProfiles(profiles, selectedProfile, sender, msgId);
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
                onClick={() => {
                  setSelectedProfile(profileName);
                }}
                isSelectedProfile={selectedProfile === profileName}
                key={index}
              />
            );
          })}
      </div>
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
  );
};

export default LoadProfiles;
