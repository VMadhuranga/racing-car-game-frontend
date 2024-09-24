import { createPortal } from "react-dom";

export function Counter({ count }) {
  return createPortal(
    <span
      style={{
        color: "white",
        fontSize: "40px",
        fontWeight: "bold",
        padding: "10px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
      }}
    >
      {count}
    </span>,
    document.getElementById("root"),
  );
}
