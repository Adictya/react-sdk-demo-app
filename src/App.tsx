import React, { useEffect, useRef, useState } from "react";
import "./app.css";
import AppBuilderReactSdk from "@appbuilder/react";
import ConfigPanels from "./Components/ConfigPanels";
// import { Link } from "react-router-dom6";

export function Log(...args: any) {
  console.log("[React HOST App]: ", ...args);
}

export type setIsLoggedInType = React.Dispatch<React.SetStateAction<boolean>>;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const ismounted = useRef(false);
  useEffect(() => {
    if (!ismounted.current) {
      const myCustomization = AppBuilderReactSdk.createCustomization({
        components: {
          // Your customizations can go here
        },
      });

      AppBuilderReactSdk.customize(myCustomization);
    }
    ismounted.current = true;
  }, []);

  return (
    <div className="App">
      <div className="header">
        <span>My React App</span>
      </div>
      <div
        style={{
          display: "flex",
          maxHeight: "calc( 100vh - 3rem )",
        }}
      >
        <div style={{ display: "flex", flex: 1, position: "relative" }}>
          {!isLoggedIn && (
            <div
              style={{
                position: "absolute",
                background: "#000000",
                zIndex: "2",
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
            >
              <div style={{ textAlign: "center" }}>Login to enable</div>
            </div>
          )}
          <AppBuilderReactSdk.View />
        </div>
        <div style={{ width: "20vw" }}>
          <ConfigPanels isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </div>
      </div>
    </div>
  );
}

export default App;
