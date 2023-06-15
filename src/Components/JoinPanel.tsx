import React, { useRef, useState } from "react";
import { Log } from "../App";
import Panel from "./Panel";
import AppBuilderReactSdk from "@appbuilder/react";

const getTextValueFromInput = (id: string) => {
  return (document.getElementById(id)! as HTMLInputElement)
    .value as unknown as string;
};

const JoinPanel: React.FC<{ disabled: string }> = ({ disabled }) => {
  const joinRoomRef = useRef<(p: string) => void>();
  const [isInPrecall, setIsInPrecall] = useState(false);

  return (
    <Panel title="Join Methods" disabled={disabled}>
      <input id="meetingId" type="text" placeholder="Room id"></input>
      <input
        id="username"
        type="text"
        placeholder="UserName (optional)"
      ></input>
      <button
        onClick={async () => {
          const meetingId = getTextValueFromInput("meetingId");
          const userName = getTextValueFromInput("username");
          const meetingData = AppBuilderReactSdk.joinRoom(meetingId, userName);
          Log("Meeting joined", meetingData);
          setIsInPrecall(false);
        }}
      >
        JoinRoom with given RoomId
      </button>
      <span style={{ textAlign: "center" }}>--- or ---</span>
      <button
        onClick={async () => {
          const meetingId = getTextValueFromInput("meetingId");
          const userName = getTextValueFromInput("username");
          const [meetingData, enterRoom] = await AppBuilderReactSdk.joinPrecall(
            meetingId,
            userName
          );
          Log("Meeting joined", meetingData);
          joinRoomRef.current = enterRoom;
          setIsInPrecall(true);
        }}
      >
        JoinPrecall with given RoomId
      </button>
      <button
        disabled={!isInPrecall}
        onClick={() => {
          const userName = getTextValueFromInput("username");
          joinRoomRef.current && joinRoomRef.current(userName);
          setIsInPrecall(false);
        }}
      >
        Join Room from Precall
      </button>
    </Panel>
  );
};

export default JoinPanel;
