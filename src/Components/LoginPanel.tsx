import React, { useEffect } from "react";
import { setIsLoggedInType } from "../App";
import Panel from "./Panel";
import AppBuilderReactSdk from "@appbuilder/react";

const LoginPanel: React.FC<{
  isLoggedIn: boolean;
  setIsLoggedIn: setIsLoggedInType;
}> = ({ setIsLoggedIn }) => {
  useEffect(() => {
    const unsub2 = AppBuilderReactSdk.on("token-refreshed", () => {
      setIsLoggedIn(true);
    });
    const unsub = AppBuilderReactSdk.on("did-token-expire", () => {
      setIsLoggedIn(false);
    });

    return () => {
      unsub();
      unsub2();
    };
  });

  return (
    <Panel title="Auth Methods">
      <textarea id="tokenInput" placeholder="Token"></textarea>
      <button
        onClick={async () => {
          const value = (
            document.getElementById("tokenInput")! as HTMLInputElement
          ).value;
          await AppBuilderReactSdk.login(value);
          setIsLoggedIn(true);
        }}
      >
        Login with token
      </button>
      <button
        onClick={async () => {
          await AppBuilderReactSdk.logout();
          setIsLoggedIn(false);
        }}
      >
        Logout
      </button>
    </Panel>
  );
};

export default LoginPanel;
