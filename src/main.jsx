import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import SignInForm from "./components/SignInForm.jsx";
import SignUpForm from "./components/SignUpForm.jsx";
import MainMenu from "./components/MainMenu.jsx";
import Menu from "./components/Menu.jsx";
import Profile from "./components/Profile.jsx";
import EditProfile from "./components/EditProfile.jsx";
import LeaderBoard from "./components/LeaderBoard.jsx";
import GamePlay from "./components/GamePlay.jsx";
import Instructions from "./components/Instructions.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import LoadingIndicator from "./components/LoadingIndicator.jsx";
import signUp from "./actions/sign-up.js";
import signIn from "./actions/sign-in.js";
import getUser from "./loaders/get-user.js";
import updateUsername from "./actions/update-username.js";
import updatePassword from "./actions/update-password.js";
import deleteUser from "./loaders/delete-user.js";
import refresh from "./actions/refresh.js";
import signOut from "./loaders/sign-out.js";
import updateBestTime from "./actions/update-best-time.js";
import getLeaderBoard from "./loaders/get-leader-board.js";
import "./main.css";

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: async ({ params }) => {
      if (!params?.userId) {
        const userId = await refresh(baseUrl);

        if (userId) {
          return redirect(`/${userId}`);
        }
      }

      return null;
    },
    children: [
      {
        path: "/",
        loader: () => {
          return redirect("/sign-in");
        },
      },
      {
        path: "/sign-in",
        element: <SignInForm />,
        action: async ({ request }) => {
          const formData = Object.fromEntries(
            (await request.formData()).entries(),
          );

          const { userId, errors } = await signIn(baseUrl, formData);

          if (errors) {
            return errors;
          }

          return redirect(`/${userId}`);
        },
      },
      {
        path: "/sign-up",
        element: <SignUpForm />,
        action: async ({ request }) => {
          const formData = Object.fromEntries(
            (await request.formData()).entries(),
          );
          const errors = await signUp(baseUrl, formData);

          if (errors) {
            return errors;
          }

          return redirect("/sign-in");
        },
      },
      {
        path: "/sign-out",
        loader: async () => {
          await signOut(baseUrl);
          return redirect("/sign-in");
        },
      },
      {
        path: "/:userId",
        element: <MainMenu />,
        loader: async ({ params }) => {
          await refresh(baseUrl);
          const { userId } = params;
          const user = await getUser(baseUrl, userId);
          return user;
        },
        children: [
          {
            index: true,
            element: <Menu />,
          },
          {
            path: "play",
            element: <GamePlay />,
            action: async ({ params, request }) => {
              await refresh(baseUrl);
              const { userId } = params;

              const formData = Object.fromEntries(
                (await request.formData()).entries(),
              );

              await updateBestTime(baseUrl, userId, formData);
              return null;
            },
          },
          {
            path: "play/exit",
            action: async ({ params, request }) => {
              await refresh(baseUrl);
              const { userId } = params;

              const formData = Object.fromEntries(
                (await request.formData()).entries(),
              );

              await updateBestTime(baseUrl, userId, formData);
              return redirect(`/${userId}`);
            },
          },
          {
            path: "instructions",
            element: <Instructions />,
          },
          {
            path: "leader-board",
            element: <LeaderBoard />,
            loader: async ({ params }) => {
              await refresh(baseUrl);
              const { userId } = params;
              const leaderBoard = await getLeaderBoard(baseUrl, userId);
              return leaderBoard;
            },
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "profile/edit",
            element: <EditProfile />,
            loader: async ({ params }) => {
              await refresh(baseUrl);
              const { userId } = params;
              const user = await getUser(baseUrl, userId);
              return user;
            },
            action: async ({ params, request }) => {
              await refresh(baseUrl);
              const { userId } = params;

              const formData = Object.fromEntries(
                (await request.formData()).entries(),
              );

              if (Object.hasOwn(formData, "new-username")) {
                const errors = await updateUsername(baseUrl, userId, formData);

                if (errors) {
                  return { errors };
                }

                const isUsernameUpdated = true;
                return { isUsernameUpdated };
              }

              if (
                Object.hasOwn(formData, "old-password") &&
                Object.hasOwn(formData, "new-password") &&
                Object.hasOwn(formData, "confirm-new-password")
              ) {
                const errors = await updatePassword(baseUrl, userId, formData);

                if (errors) {
                  return { errors };
                }

                const isPasswordUpdated = true;
                return { isPasswordUpdated };
              }

              return null;
            },
          },
          {
            path: "profile/delete",
            loader: async ({ params }) => {
              await refresh(baseUrl);
              const { userId } = params;
              await deleteUser(baseUrl, userId);
              return redirect("/");
            },
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} fallbackElement={<LoadingIndicator />} />
  </StrictMode>,
);
