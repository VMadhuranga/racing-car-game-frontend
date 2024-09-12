import { Link } from "react-router-dom";
import UserForm from "./UserForm";

export default function SignInForm() {
  return (
    <div className="sign-in-form">
      <UserForm buttonContent={"Sign in"} />
      <p>
        Don&apos;t have an account? <Link to={"/sign-up"}>Sign up</Link>
      </p>
    </div>
  );
}
