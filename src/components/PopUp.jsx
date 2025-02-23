import React, { useState, useEffect, useRef } from "react";
import { setEscape } from "./EscapeHandler";

export const Popup = ({ children, isOpen, onClose }) => {
  if (!isOpen) {
    setEscape.remove();
    return null;
  }
  setEscape.add(onClose);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 999,
        backdropFilter: "blur(5px)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "80vw",
          height: "80vh",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          overflowY: "auto",
          zIndex: 1000,
          borderRadius: "2rem",
          padding: "1rem",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
