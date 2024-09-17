import { Form, Link, useActionData } from "react-router-dom";

export default function SignUpForm() {
  const errors = useActionData();

  return (
    <section className="sign-up-form">
      <h2>Sign up</h2>
      <Form method="POST">
        <div>
          <label htmlFor="username">User name:</label>
          <input type="text" id="username" name="username" required />
          {errors &&
            errors.username?.map((error, index) => (
              <span key={index}>{"* " + error}</span>
            ))}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="text" id="password" name="password" required />
          {errors &&
            errors.password?.map((error, index) => (
              <span key={index}>{"* " + error}</span>
            ))}
        </div>
        <div>
          <label htmlFor="confirm-password">Confirm password:</label>
          <input
            type="text"
            id="confirm-password"
            name="confirm-password"
            required
          />
          {errors &&
            errors["confirm-password"]?.map((error, index) => (
              <span key={index}>{"* " + error}</span>
            ))}
        </div>
        <button type="submit">Sign up</button>
      </Form>
      <p>
        Already have an account? <Link to={"/sign-in"}>Sign in</Link>
      </p>
    </section>
  );
}
