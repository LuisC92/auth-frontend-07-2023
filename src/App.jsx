import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ChangePassword from "./pages/ChangePassword";
import HomePage from "./pages/HomePage";
import ForgetPassword from "./pages/ForgetPassword";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./routes/ProtectedRoute";
import AuthContext from "./contexts/AuthContext";
import UserContext from "./contexts/UserContext";
// import Analytics from "./pages/Analytics";
// import Admin from "./pages/Admin";

function App() {
  const { user } = useContext(UserContext);
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          element={
            <ProtectedRoute redirectPath="/login" isAllowed={isAuthenticated && user} />
          }
          >
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Route>

        {/* 
          //! fake data for permissions and roles
          <Route path="/analytics" element={
            <ProtectedRoute redirectPath="/" isAllowed={isAuthenticated && user && user.permissions.includes("analyze")}>
              <Analytics />
            </ProtectedRoute>
          } /> */}

        {/* <Route path="/admin" element={
            <ProtectedRoute redirectPath="/" isAllowed={isAuthenticated && user && user.roles.includes("admin")}>
              <Admin />
            </ProtectedRoute>
          } /> 
              //! fake data for permissions and roles
          */}

        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
      </Routes>
    </>
  );
}

export default App;
