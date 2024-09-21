import { Link, useParams } from "react-router-dom";

export default function Profile() {
  const { userId } = useParams();

  return (
    <section className="profile">
      <h2>Profile</h2>
      <ul>
        <li>
          <Link to={"edit"}>Edit profile</Link>
        </li>
        <li>
          <Link to={"delete"}>Delete profile</Link>
        </li>
        <li>
          <Link to={"/sign-out"}>Sign out</Link>
        </li>
        <li>
          <Link to={`/${userId}`}>{"<-"} Go back</Link>
        </li>
      </ul>
    </section>
  );
}
