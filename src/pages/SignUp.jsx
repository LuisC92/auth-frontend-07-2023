import api from "../api/api";
import { useForm } from "react-hook-form";
import {useNavigate} from "react-router-dom"

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate()

  const createUser = (data) => {
    console.log(data);
    api
      .post("/auth/sign-up", data)
      .then((response) => {
        if(response.status === 201){
          navigate("/login")
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          console.error(error);
          alert(error.response.data);
        }
      });
  };

  return (
    <div>
      <h1>Sign-Up</h1>
      <form onSubmit={handleSubmit(createUser)}>
        <label>email:</label>
        <br />
        <input
          type="email"
          {...register("email", { required: "email is required" })}
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && <p>{errors.email?.message}</p>}
        <br />
        <label>password:</label>
        <br />
        <input
          type="password"
          {...register("password", { required: "password is required" })}
          aria-invalid={errors.password ? "true" : "false"}
        />
        {errors.password && <p>{errors.password?.message}</p>}
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default SignUp;
