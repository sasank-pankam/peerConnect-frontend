import { useState } from "react";

/**
 * @param {Boolean} isSelectedProfile
 * @param {Boolean} selectedProfile
 * @param {Object} profiles
 * @param {() => void} onClick
 * @param {() => void} setProfiles
 */
const Profile = ({ isSelectedProfile, profile, onClick, setProfiles }) => {
  const [edit, setEdit] = useState(false);
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
          // onSubmit={(event) => {
          // }}
          action=""
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
          className="profile-card"
        >
          <div>
            <p>
              <label>Visible Name:</label>
              <input
                className="bg-transparent "
                name="name"
                defaultValue={profile.USER.name}
              />
            </p>
            <p>
              <label>Server Ip:</label>{" "}
              <input
                name="ip"
                className="bg-transparent "
                defaultValue={profile.SERVER.ip}
              />
            </p>
            <p>
              <label>Server Port:</label>{" "}
              <input
                name="port"
                className="bg-transparent "
                defaultValue={profile.SERVER.port}
              />
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
                const name = document.getElementsByName("name")[0].value;
                const ip = document.getElementsByName("ip")[0].value;
                const port = document.getElementsByName("port")[0].value;

                profile.USER.name = name;
                profile.SERVER.ip = ip;
                profile.SERVER.port = port;

                setProfiles((prev) => {
                  return [prev[0], { ...prev[1] }];
                });
                setEdit(false);
              }}
            >
              Confirm
            </button>
          </div>
        </form>
      ) : (
        <div
          // onClick={(event) => {
          //   event.preventDefault();
          //   event.stopPropagation();
          // }}
          className="profile-card"
        >
          <div>
            <p>
              <label>Visible Name:</label> <label>{profile.USER.name}</label>
            </p>
            <p>
              <label>Server Ip:</label>{" "}
              <label
                style={{
                  textOverflow: "ellipsis",
                }}
              >
                {profile.SERVER.ip}
              </label>
            </p>
            <p>
              <label>Server Port:</label> <label>{profile.SERVER.port}</label>
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
