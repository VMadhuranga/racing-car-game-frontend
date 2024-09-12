import { Link } from "react-router-dom";
import UserForm from "./UserForm";

export default function SignUpForm() {
  return (
    <div className="sign-up-form">
      <UserForm buttonContent={"Sign up"}></UserForm>
      <p>
        Already have an account? <Link to={"/sign-in"}>Sign in</Link>
      </p>
    </div>
  );
}
