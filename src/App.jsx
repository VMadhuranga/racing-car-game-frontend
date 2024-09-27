import { Outlet, useLocation, useNavigation } from "react-router-dom";
import LoadingIndicator from "./components/LoadingIndicator";

function App() {
  const location = useLocation();
  const navigation = useNavigation();

  return (
    <>
      {!location.pathname.includes("play") && <h1>Racing Car Game</h1>}
      {(navigation.state === "loading" ||
        navigation.state === "submitting") && <LoadingIndicator />}
      <Outlet />
    </>
  );
}

export default App;
