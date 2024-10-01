import { createPortal } from "react-dom";
import formatTimeToMinSecMil from "../utils/format-time-to-min-sec-mil";
import { Form, useNavigate, useOutletContext } from "react-router-dom";

export function GameOver({ time, handleRestart }) {
  const user = useOutletContext();
  const navigate = useNavigate();

  function handleRestartClick(e) {
    if (Number(time) <= Number(user["best-time"])) {
      e.preventDefault();
      handleRestart();
    }
  }

  function handleExitClick(e) {
    if (Number(time) <= Number(user["best-time"])) {
      e.preventDefault();
      navigate(`/${user.id}`);
    }
  }

  return createPortal(
    <section
      style={{
        color: "white",
        fontSize: "20px",
        fontWeight: "bold",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
      }}
    >
      <h2>Game over</h2>
      <p>Your time</p>
      <p>{formatTimeToMinSecMil(time)}</p>
      <Form method="PATCH" onSubmit={handleRestart}>
        <input type="hidden" name="best-time" value={time} />
        <button type="submit" onClick={handleRestartClick}>
          Restart
        </button>
      </Form>
      <Form method="PATCH" action="exit">
        <input type="hidden" name="best-time" value={time} />
        <button type="submit" onClick={handleExitClick}>
          Exit
        </button>
      </Form>
    </section>,
    document.getElementById("root"),
  );
}
