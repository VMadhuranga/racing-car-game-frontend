import { useEffect, useState } from "react";
import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useParams,
} from "react-router-dom";

export default function EditProfile() {
  const [isEditUsername, setIsEditUsername] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);
  const { userId } = useParams();
  const user = useLoaderData();
  const actionData = useActionData();

  useEffect(() => {
    if (actionData?.isUsernameUpdated) {
      setIsEditUsername(() => false);
    }
  }, [actionData]);

  useEffect(() => {
    if (actionData?.isPasswordUpdated) {
      setIsEditPassword(() => false);
    }
  }, [actionData]);

  return (
    <section className="edit-profile">
      <h2>Edit Profile</h2>
      <ul>
        <li>
          {!isEditUsername && (
            <>
              <span>User name: {user.username}</span>
              <button onClick={() => setIsEditUsername(!isEditUsername)}>
                edit
              </button>
            </>
          )}
          {isEditUsername && (
            <Form method="PATCH">
              <div>
                <label htmlFor="new-username">New username:</label>
                <input
                  type="text"
                  id="new-username"
                  name="new-username"
                  required
                />
                {actionData?.errors &&
                  actionData.errors["new-username"]?.map((error, index) => (
                    <span key={index}>{"* " + error}</span>
                  ))}
              </div>
              <div>
                <button type="submit">Update</button>
                <button
                  type="button"
                  onClick={() => setIsEditUsername(!isEditUsername)}
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </li>
        <li>
          {!isEditPassword && (
            <>
              Password: *****{" "}
              <button
                type="button"
                onClick={() => setIsEditPassword(!isEditPassword)}
              >
                edit
              </button>
            </>
          )}
          {isEditPassword && (
            <Form method="PATCH">
              <div>
                <label htmlFor="old-password">Old password:</label>
                <input
                  type="text"
                  id="old-password"
                  name="old-password"
                  required
                />
                {actionData?.errors &&
                  actionData.errors["old-password"]?.map((error, index) => (
                    <span key={index}>{"* " + error}</span>
                  ))}
              </div>
              <div>
                <label htmlFor="new-password">New password:</label>
                <input
                  type="text"
                  id="new-password"
                  name="new-password"
                  required
                />
                {actionData?.errors &&
                  actionData.errors["new-password"]?.map((error, index) => (
                    <span key={index}>{"* " + error}</span>
                  ))}
              </div>
              <div>
                <label htmlFor="confirm-new-password">
                  Confirm new password:
                </label>
                <input
                  type="text"
                  id="confirm-new-password"
                  name="confirm-new-password"
                  required
                />
                {actionData?.errors &&
                  actionData.errors["confirm-new-password"]?.map(
                    (error, index) => <span key={index}>{"* " + error}</span>,
                  )}
              </div>
              <div>
                <button type="submit">Update</button>
                <button
                  type="button"
                  onClick={() => setIsEditPassword(!isEditPassword)}
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </li>
        <li>
          <Link to={`/${userId}/profile`}>{"<-"} Go back</Link>
        </li>
      </ul>
    </section>
  );
}
