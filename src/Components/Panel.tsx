import React from "react";
export default function Panel(props: {
  title: string;
  disabled?: string;
  children: any;
}) {
  return (
    <div
      style={{
        margin: "5px",
        border: "1px dashed white",
        padding: "2px",
        background: "#00000020",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {props.disabled && (
        <div
          style={{
            position: "absolute",
            background: "#00000099",
            zIndex: "2",
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>{props.disabled}</div>
        </div>
      )}
      <h3 style={{ fontFamily: "sans-serif", margin: "2px", color: "white" }}>
        {props.title}
      </h3>
      {props.children}
    </div>
  );
}
