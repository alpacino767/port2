import { useAppContext } from "../context/appContext";
import React from "react";

const Alert = () => {
  const { alertType, alertText } = useAppContext();

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span className="spinner"></span>
      <div className={`alert alert-${alertType}`}>{alertText}</div>
    </div>
  );
};

export default Alert;
