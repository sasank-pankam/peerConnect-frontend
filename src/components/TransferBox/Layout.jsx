export const BoxLayout = ({ time, children, isSender }) => {
  const now = new Date(time);
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  return (
    <div
      style={{
        height: "fit-content",
        display: "flex",
        flexDirection: "column",
        alignItems: isSender ? "flex-end" : "flex-start",
        margin: ".3rem",
      }}
    >
      {children}
      <div className=" bg-gray-300 rounded-md">
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div className="time">{`${currentHour}:${currentMinute}`}</div>
        </div>
      </div>
    </div>
  );
};
