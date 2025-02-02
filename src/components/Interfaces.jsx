import { useState } from "react";

export const InterFacePicker = ({
  interfaces,
  profile,
  setHasInterfaces,
  setClicked,
}) => {
  const [selectedIf, setSelectedIf] = useState(-1);
  console.log(interfaces, profile);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "50%",
          height: "50%",
          backgroundColor: "lightgray",
          borderRadius: ".3rem",
          flexDirection: "column",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            width: "90%",
            minHeight: "40%",
            maxHeight: "70%",
            alignItems: "center",
          }}
        >
          {interfaces.map((if_name, ind) => (
            <div
              onClick={(e) => setSelectedIf(ind)}
              className={`${ind === selectedIf ? "hilight" : "normal"} interface`}
              key={ind}
            >
              {if_name}
            </div>
          ))}
        </div>
        <button onClick={(e) => setClicked(true)}>proceed</button>
      </div>
    </div>
  );
};
