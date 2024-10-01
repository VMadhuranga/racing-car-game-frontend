import { Outlet, useLoaderData } from "react-router-dom";

export default function MainMenu() {
  const user = useLoaderData();
  return <Outlet context={user} />;
}
