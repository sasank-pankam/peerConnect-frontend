import { getRandom255BitNumber } from "./randomNumbers";
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

const PROFILESINDEX = 1;

export const askProfile = () => {
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

export const askAndAddProfile = (setProfiles) => {
  const profile = askProfile();
  if (!profile) return;
  setProfiles((prev) => {
    const profiles = prev[PROFILESINDEX];
    profiles[`${Date.now()}`] = {
      USER: Object.fromEntries(userThings.map((item) => [item, profile[item]])),
      SERVER: Object.fromEntries(
        serverThings.map((item) => [item, profile[item]]),
      ),
    };

    return [...prev];
  });
};

export const askAndRemoveProfile = (selectedProfile, setProfiles) => {
  if (!selectedProfile) {
    alert("select a profile");
    return;
  }

  setProfiles((prev) => {
    const profiles = prev[PROFILESINDEX];

    delete profiles[selectedProfile];
    return [...prev];
  });
};
