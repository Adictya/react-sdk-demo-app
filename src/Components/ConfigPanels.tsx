import React from "react";
import { setIsLoggedInType } from "../App";
import DeviceSelection from "./DeviceSelection";
import JoinPanel from "./JoinPanel";
import LoginPanel from "./LoginPanel";

const ConfigPanels: React.FC<{
  isLoggedIn: boolean;
  setIsLoggedIn: setIsLoggedInType;
}> = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#343233",
        color: "white",
        fontFamily: "sans-serif",
        overflowY: "auto",
        height: "calc( 100vh - 3rem )",
      }}
    >
      <LoginPanel
        isLoggedIn={props.isLoggedIn}
        setIsLoggedIn={props.setIsLoggedIn}
      />
      <JoinPanel disabled={!props.isLoggedIn ? "Login to enable" : ""} />
      <DeviceSelection disabled={!props.isLoggedIn ? "Login to enable" : ""} />
    </div>
  );
};

export default ConfigPanels;
