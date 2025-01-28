const styles = {
  listItem: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "10px",
    padding: ".6rem",
    fontFamily: "Arial, sans-serif",
    width: "100%",
    borderRadius: "0.3rem",
  },
  info: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "5px",
  },
  name: {
    fontWeight: "bold",
  },
  percentage: {
    fontSize: "0.9rem",
    color: "#666",
  },
  progressBarContainer: {
    height: "8px",
    backgroundColor: "#e0e0e0",
    borderRadius: "4px",
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "red",
    transition: "width 0.3s ease",
  },
};

export const ListItem = ({ item }) => {
  const { name, percentage = 0 } = item;
  return (
    <div style={styles.listItem} className="hover-gray">
      <div style={styles.info}>
        <span style={styles.name}>{name}</span>
        <span style={styles.percentage}>{percentage}%</span>
      </div>
      <div style={styles.progressBarContainer}>
        <div
          style={{
            ...styles.progressBar,
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
};
