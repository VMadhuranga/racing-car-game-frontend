import { createPortal } from "react-dom";

export default function LoadingIndicator() {
  return createPortal(
    <span className="loader"></span>,
    document.getElementById("root"),
  );
}
