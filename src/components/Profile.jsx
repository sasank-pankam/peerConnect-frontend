import { useRef } from "react";
import { useState } from "react";

const CustomInput = ({ labelName, name, defaultValue }) => {
  return (
    <p>
      <label>{labelName}:</label>
      <input
        className="bg-transparent "
        name={name}
        defaultValue={defaultValue}
      />
    </p>
  );
};

const CustomLabel = ({ labelName, value }) => {
  return (
    <p>
      <label>{labelName}:</label> <label>{value}</label>
    </p>
  );
};

const getInterFace = (iface, interfaces) => {
  for (let _if of interfaces) {
    if (_if.if_name == iface) return _if;
  }
  return {};
};

const getFriendlyName = (iface, interfaces) => {
  const _if = getInterFace(iface, interfaces);
  if (_if.if_name) return _if.friendly_name;
  return "";
};

const checkForInterface = (ifname, interfaces) => {
  return getInterFace(ifname, interfaces).if_name ? true : false;
};
const Profile = ({
  isSelectedProfile,
  profile,
  interfaces,
  onClick,
  setProfiles,
}) => {
  const [edit, setEdit] = useState(profile.edit ? true : false);
  const formRef = useRef(null);
  return (
    <div
      onClick={onClick}
      className={
        isSelectedProfile
          ? "bg-gray-400  rounded-xl"
          : "bg-gray-200  rounded-xl"
      }
    >
      {edit ? (
        <form
          action=""
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
          className="profile-card"
          ref={formRef}
        >
          <div>
            <CustomInput
              name={"name"}
              defaultValue={profile.USER.name}
              labelName={"Visible Name"}
            />
            <p>
              <label>Interface Name: </label>
              <select
                name="ifname"
                id="bg-transparent"
                defaultValue={profile.INTERFACE.if_name}
                autoFocus={true}
              >
                <option value="">Select</option>
                {interfaces.map((ifName, index) => {
                  return (
                    <option value={ifName.if_name} key={index}>
                      {ifName.friendly_name}
                    </option>
                  );
                })}
              </select>
            </p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "end",
              width: "100%",
            }}
          >
            <button
              style={{
                width: "fit-content",
              }}
              type="submit"
              onClick={() => {
                const formElement = formRef.current;
                const name =
                  formElement.querySelectorAll('[name="name"]')[0].value;
                const iface =
                  formElement.querySelectorAll('[name="ifname"]')[0].value;
                const friendly_name = getFriendlyName(iface, interfaces);

                profile.USER.name = name;
                profile.INTERFACE.if_name = iface;
                profile.INTERFACE.friendly_name = friendly_name;
                profile.INTERFACE.ip = getInterFace(iface, interfaces).ip;

                setProfiles((prev) => {
                  return [...prev];
                });
                setEdit(false);
                onClick(false);
              }}
            >
              Confirm
            </button>
          </div>
        </form>
      ) : (
        <div className="profile-card">
          <div>
            <CustomLabel labelName={"Visible Name"} value={profile.USER.name} />
            <CustomLabel labelName="Ip" value={profile.INTERFACE.ip} />
            <CustomLabel
              labelName="Interface Name"
              value={
                checkForInterface(profile.INTERFACE.if_name, interfaces)
                  ? profile.INTERFACE.friendly_name
                  : "Select"
              }
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              width: "100%",
            }}
          >
            <button
              className="edit"
              onClick={(event) => {
                event.stopPropagation();
                setEdit(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-pencil"
              >
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                <path d="m15 5 4 4" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
