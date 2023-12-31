import React, { useEffect, useMemo, useState } from "react";
import AppBuilderReactSdk from "@appbuilder/react";
import Panel from "./Panel";

const DeviceSelection: React.FC<{ disabled: string }> = ({ disabled }) => {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const videoDevices = useMemo(() => {
    return devices.filter((device) => device.kind === "videoinput");
  }, [devices]);
  const audioDevices = useMemo(() => {
    return devices.filter((device) => device.kind === "audioinput");
  }, [devices]);
  const speakerDevices = useMemo(() => {
    return devices.filter((device) => device.kind === "audiooutput");
  }, [devices]);
  const [selectedCam, setSelectedCam] = useState("0");
  const [selectedMic, setSelectedMic] = useState("0");
  const [selectedSpeaker, setSelectedSpeaker] = useState("0");

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then(() => {
        navigator.mediaDevices.enumerateDevices().then((devices) => {
          setDevices(devices);
        });
      });
    const unsub = [
      AppBuilderReactSdk.on("devices-selected-camera-changed", (deviceId) => {
        console.log("SDKEVENT: cam changed", deviceId);
        setSelectedCam(deviceId);
      }),
      AppBuilderReactSdk.on(
        "devices-selected-microphone-changed",
        (deviceId) => {
          console.log("SDKEVENT: mic changed", deviceId);
          setSelectedMic(deviceId);
        }
      ),
      AppBuilderReactSdk.on("devices-selected-speaker-changed", (deviceId) => {
        console.log("SDKEVENT: speaker changed", deviceId);
        setSelectedSpeaker(deviceId);
      }),
    ];

    return () => {
      unsub.forEach((p) => p());
    };
  }, []);

  return (
    <Panel title="Devices" disabled={disabled}>
      <span>
        {videoDevices.find((d) => {
          return d.deviceId === selectedCam;
        })?.label ?? "Cam Not initialized"}
      </span>
      <select
        onChange={(e) => {
          AppBuilderReactSdk.setCamera(
            videoDevices[e.target.value as unknown as number].deviceId
          );
        }}
      >
        {videoDevices.map((e, i) => {
          return (
            <option value={i} key={i + "cam"}>
              {e.label}
            </option>
          );
        })}
      </select>
      <span>
        {audioDevices.find((d) => {
          return d.deviceId === selectedMic;
        })?.label ?? "Mic Not initialized"}
      </span>
      <select
        onChange={(e) => {
          AppBuilderReactSdk.setMicrophone(
            audioDevices[e.target.value as unknown as number].deviceId
          );
          setSelectedMic(e.target.value);
        }}
      >
        {audioDevices.map((e, i) => {
          return (
            <option value={i} key={i + "audio"}>
              {e.label}
            </option>
          );
        })}
      </select>
      <span>
        {speakerDevices.find((d) => {
          return d.deviceId === selectedSpeaker;
        })?.label ?? "Speaker not initialized"}
      </span>
      <select
        onChange={(e) => {
          AppBuilderReactSdk.setSpeaker(
            speakerDevices[e.target.value as unknown as number].deviceId
          );
        }}
      >
        {speakerDevices.map((e, i) => {
          return (
            <option value={i} key={i + "speaker"}>
              {e.label}
            </option>
          );
        })}
      </select>
      <button
        onClick={() => {
          AppBuilderReactSdk.muteVideo((p) => !p);
        }}
      >
        Toggle Video
      </button>
      <button
        onClick={() => {
          AppBuilderReactSdk.muteVideo(true);
        }}
      >
        Mute Video
      </button>
      <button
        onClick={() => {
          AppBuilderReactSdk.muteVideo(false);
        }}
      >
        Unmute Video
      </button>
      <button
        onClick={() => {
          AppBuilderReactSdk.muteAudio((p) => !p);
        }}
      >
        Toggle Audio
      </button>
      <button
        onClick={() => {
          AppBuilderReactSdk.muteAudio(true);
        }}
      >
        Mute Audio
      </button>
      <button
        onClick={() => {
          AppBuilderReactSdk.muteAudio(false);
        }}
      >
        Unmute Audio
      </button>
    </Panel>
  );
};

export default DeviceSelection;
