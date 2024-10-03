import { Link, useParams } from "react-router-dom";

export default function Instructions() {
  const { userId } = useParams();

  return (
    <section className="instructions">
      <h2>Instructions</h2>
      <p>On Keyboard:</p>
      <ul>
        <li>
          Press <kbd>Arrow key right</kbd> to go to right
        </li>
        <li>
          Press <kbd>Arrow key left</kbd> to go to left
        </li>
        <li>
          Press <kbd>Shift</kbd> + <kbd>Arrow key right</kbd> to go to right
          faster
        </li>
        <li>
          Press <kbd>Shift</kbd> + <kbd>Arrow key left</kbd> to go to left
          faster
        </li>
      </ul>
      <hr />
      <p>On Touch Screen:</p>
      <ul>
        <li>Touch right side of the track to go to right</li>
        <li>Touch left side of the track to go to left</li>
      </ul>
      <Link to={`/${userId}`}>{"<-"} Go back</Link>
    </section>
  );
}
