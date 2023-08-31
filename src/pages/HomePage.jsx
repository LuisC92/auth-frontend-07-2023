import { useContext } from "react";
import UserContext from "../contexts/UserContext";

const HomePage = () => {

    const {user} = useContext(UserContext)

  return (
    <div>
      {/* <h1>HomePage</h1> */}
      <h2>Welcome back {user.email}</h2>
    </div>
  );
};

export default HomePage;
