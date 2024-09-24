import { Outlet, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  return (
    <>
      {!location.pathname.includes("play") && <h1>Racing Car Game</h1>}
      <Outlet />
    </>
  );
}

export default App;
