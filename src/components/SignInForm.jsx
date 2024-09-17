import { Form, Link, useActionData } from "react-router-dom";

export default function SignInForm() {
  const errors = useActionData();

  return (
    <section className="sign-in-form">
      <h2>Sign in</h2>
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
        <button type="submit">Sign in</button>
      </Form>
      <p>
        Don&apos;t have an account? <Link to={"/sign-up"}>Sign up</Link>
      </p>
    </section>
  );
}
