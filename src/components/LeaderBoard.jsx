import { Link, useLoaderData, useParams } from "react-router-dom";
import formatTimeToMinSecMil from "../utils/format-time-to-min-sec-mil";

export default function LeaderBoard() {
  const leaderBoard = useLoaderData();
  const { userId } = useParams();

  return (
    <section className="leader-board">
      <h2>LeaderBoard</h2>
      <ul>
        {leaderBoard.map((lb, idx) => {
          return (
            <li key={lb.id}>
              <span>
                {idx + 1}. {lb.username}
              </span>
              <span>{formatTimeToMinSecMil(lb["best-time"])}</span>
            </li>
          );
        })}
      </ul>
      <Link to={`/${userId}`}>{"<-"} Go back</Link>
    </section>
  );
}
