import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ChangePassword from "./pages/ChangePassword";
import { UserContextProvider } from "./contexts/UserContext";
import HomePage from "./pages/HomePage";
import ForgetPassword from "./pages/ForgetPassword";

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
