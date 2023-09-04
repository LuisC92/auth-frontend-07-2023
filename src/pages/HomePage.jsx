import { useContext } from "react";
import UserContext from "../contexts/UserContext";

const HomePage = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      {user && user?.email ? (
        <h2>Welcome back {user.email}</h2>
      ) : (
        <>
          <h1>HomePage</h1>
          <h2>Public Route</h2>
        </>
      )}
    </div>
  );
};

export default HomePage;
