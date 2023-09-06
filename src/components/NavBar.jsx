import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <nav style={{ display: "flex", flexDirection: "column" }}>
       <Link to="/">Home</Link>
       <Link to="/profile">Profile</Link>
       <Link to="/dashboard">Dashboard</Link>
       {/* <Link to="/admin">Admin</Link>
       <Link to="/analytics">Analytics</Link> */}
       <Link to="/sign-up">Sign Up</Link>
       <Link to="/login">Login</Link>
       <Link to="/change-password">Change Password</Link>
       <Link to="/forget-password">Forget Password</Link>
    </nav>
  )
}

export default NavBar
