import api from "../api/api";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie"

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginUser = (data) => {
    // console.log(data)
    api
      .post("/auth/login", data)
      .then((response) => {
        //! save token in cookies
        Cookies.set("user_token", response.data.token)
        // //! save token in local storage
        // localStorage.setItem("user_token", response.data.token)
        console.log(response)
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Login</h1>
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
