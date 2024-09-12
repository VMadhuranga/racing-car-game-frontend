import { Form, useActionData } from "react-router-dom";

export default function UserForm({ buttonContent }) {
  const errors = useActionData();

  return (
    <>
      <Form method="POST" className="user-form">
        <div>
          <label htmlFor="username">User name:</label>
          <input type="text" id="username" name="username" />
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
        <button type="submit">{buttonContent}</button>
      </Form>
    </>
  );
}
