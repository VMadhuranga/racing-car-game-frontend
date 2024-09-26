import { Link } from "react-router-dom";

export default function MainMenu() {
  return (
    <section className="main-menu">
      <h2>Main menu</h2>
      <ul>
        <li>
          <Link to={"play"}>Start game</Link>
        </li>
        <li>
          <Link to={"instructions"}>Instructions</Link>
        </li>
        <li>
          <Link to={"leader-board"}>Leader board</Link>
        </li>
        <li>
          <Link to={"profile"}>Profile</Link>
        </li>
      </ul>
    </section>
  );
}
