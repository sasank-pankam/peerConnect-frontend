import { useState } from "react";
import Profile from "./Profile.jsx";
import { getRandom255BitNumber } from "../utils/randomNumbers.js";
import { useEffect } from "react";
import { getSelectedProfileWithAttribute } from "../utils/actions.js";

const ipv4Pattern =
  /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$/gm;
const ipv6Pattern =
  /^(?:(?:[a-fA-F\d]{1,4}:){7}(?:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,2}|:)|(?:[a-fA-F\d]{1,4}:){4}(?:(?::[a-fA-F\d]{1,4}){0,1}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,3}|:)|(?:[a-fA-F\d]{1,4}:){3}(?:(?::[a-fA-F\d]{1,4}){0,2}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,4}|:)|(?:[a-fA-F\d]{1,4}:){2}(?:(?::[a-fA-F\d]{1,4}){0,3}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,5}|:)|(?:[a-fA-F\d]{1,4}:){1}(?:(?::[a-fA-F\d]{1,4}){0,4}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,6}|:)|(?::(?:(?::[a-fA-F\d]{1,4}){0,5}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,7}|:)))(?:%[0-9a-zA-Z]{1,})?$/gm;

const configOptions = ["Ip", "Name", "Port"];
const configSanitizer = {
  ["Ip"]: (ip) => {
    return ipv4Pattern.test(ip) || ipv6Pattern.test(ip);
    // return true;
  },
  ["Name"]: (name) => {
    return !(name.length === 0);
    // return true;
  },
  ["Port"]: (port) => {
    port = Number(port);
    return 0 <= port && port <= 65535;
    // return true;
  },
};

const askProfile = () => {
  try {
    return {
      ...Object.fromEntries(
        Array.from(configOptions, (config) => {
          const inp = prompt(`Enter ${config} :`);
          if (!configSanitizer[config](inp)) {
            alert(`Invalid input for ${config}`);
            throw new Error("Sanitization error");
          }
          return [config.toLowerCase(), inp];
        }),
      ),
      id: getRandom255BitNumber(),
    };
  } catch (_) {
    return null;
  }
};

const userThings = ["name", "id"];
const serverThings = ["ip", "port"];

const askAndAddProfile = (setProfiles) => {
  const profile = askProfile();
  // console.log(profile);
  if (!profile) return;
  setProfiles((prev) => [
    prev[0],
    {
      ...prev[1],
      [`${Date.now()}`]: {
        USER: Object.fromEntries(
          userThings.map((item) => [item, profile[item]]),
        ),
        SERVER: Object.fromEntries(
          serverThings.map((item) => [item, profile[item]]),
        ),
      },
    },
  ]);
};

const askAndRemoveProfile = (selectedProfile, setProfiles) => {
  if (!selectedProfile) {
    alert("select a profile");
    return;
  }
  // const index = selectedProfile - 1;
  // setProfiles((prev) => {
  //   return prev.filter((_, ind) => {
  //     return !(ind === index);
  //   });
  // });
  setProfiles((prev) => {
    const newProfiles = { ...prev[1] };
    delete newProfiles[selectedProfile];
    return [prev[0], newProfiles];
  });
};

/**
 * @param {Function} clicked
 * @param {Object} profiles
 * @param {() => void} setProfiles
 */
const ProfileWrapper = ({ clicked, profiles = {}, setProfiles }) => {
  const [selectedProfile, setSelectedProfile] = useState(null);
  useEffect(() => {
    const profileName = getSelectedProfileWithAttribute(profiles);
    if (profileName) {
      setProfiles((prevProfiles) => {
        const [id, currProfiles] = prevProfiles;
        delete currProfiles[profileName].selected;
        return [id, currProfiles];
      });
    }

    setSelectedProfile(profileName);
  }, [profiles]);
  return (
    <div className="profiles-contianer flex flex-col gap-10 justify-center items-center">
      <div className="profiles flex gap-10">
        {profiles &&
          Object.keys(profiles).map((profileName, index) => {
            return (
              <Profile
                setProfiles={setProfiles}
                profile={profiles[profileName]}
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
                profiles,
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

export default ProfileWrapper;
