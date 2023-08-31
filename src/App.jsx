import {Routes, Route} from "react-router-dom"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import ChangePassword from "./pages/ChangePassword"

function App() {

  return (
    <>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
      
    </>
  )
}

export default App
