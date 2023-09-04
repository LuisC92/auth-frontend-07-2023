import api from "../api/api";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import AuthContext from "../contexts/AuthContext";

const Login = () => {
  const { setUser } = useContext(UserContext);
  const { setIsAuthenticated } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const loginUser = (data) => {
    // console.log(data)
    //! fake data for permissions and roles
    // console.log({
    //   id: "1",
    //   name: "robin",
    //   permissions: ["analyze"],
    //   roles: ["user"],
    // });
    // setUser({
    //   id: "1",
    //   name: "robin",
    //   permissions: ["analyze"],
    //   roles: ["user"],
    // });
    // setIsAuthenticated(true);
    // navigate("/");
    //! fake data for permissions and roles

    api
      .post("/auth/login", data)
      .then((response) => {
        if (response.status === 200) {
          //! save token in cookies
          Cookies.set("user_token", response.data.token);
          // //! save token in local storage
          // localStorage.setItem("user_token", response.data.token)
          let config = {
            headers: {
              Authorization: "Bearer " + response.data.token,
            },
          };

          api
            .get("/user", config)
            .then((response) => {
              if (response.status === 200) {
                setUser(response.data);
                setIsAuthenticated(true);
                navigate("/");
              }
            })
            .catch((error) => console.error(error));
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Login</h1>
      <h2>Public Route</h2>
      <form onSubmit={handleSubmit(loginUser)}>
        <label>Email:</label>
        <br />
        <input
          placeholder="email"
          type="email"
          {...register("email", { required: "email is required" })}
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && <p>{errors.email?.message}</p>}
        <br />

        <label>Password:</label>
        <br />

        <input
          placeholder="password"
          type="password"
          {...register("password", { required: "password is required" })}
          aria-invalid={errors.password ? "true" : "false"}
        />
        {errors.password && <p>{errors.password?.message}</p>}
        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
