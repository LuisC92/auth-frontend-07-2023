import { useForm } from "react-hook-form";
import api from "../api/api";

const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const forgetPassword = (data) => {
    api
      .post("/password/forget-password", data)
      .then((response) => {
        if (response.status === 200) {
          alert("Email has been send");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Forget Password</h1>
      <form onSubmit={handleSubmit(forgetPassword)}>
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
        <button type="submit">Send Email</button>
      </form>
    </div>
  );
};

export default ForgetPassword;
