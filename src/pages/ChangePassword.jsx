import { useState } from "react";
import { useForm } from "react-hook-form";
import api from "../api/api";
import Cookies from "js-cookie";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");

  const changePassword = (data) => {
    if (data.newPassword === data.repeatPassword) {
      //! api to change password
      setError("");
      delete data.repeatPassword;

      let config = {
        headers: {
          Authorization: "Bearer " + Cookies.get("user_token"),
        },
      };
      api
        .post("/password/change-password", data, config)
        .then((response) => console.log(response))
        .catch((error) => console.error(error));
    } else {
      setError("The new password is different from the repeat password");
    }
  };

  return (
    <div>
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit(changePassword)}>
        <label>Current Password:</label>
        <br />
        <input
          type="password"
          {...register("password", { required: "password is required" })}
          aria-invalid={errors.password ? "true" : "false"}
        />
        {errors.password && <p>{errors.password?.message}</p>}

        <br />
        <label>New Password:</label>
        <br />
        <input
          type="password"
          {...register("newPassword", { required: "password is required" })}
          aria-invalid={errors.newPassword ? "true" : "false"}
        />
        {errors.newPassword && <p>{errors.newPassword?.message}</p>}

        <br />
        <label>Repeat Password:</label>
        <br />
        <input
          type="password"
          {...register("repeatPassword", { required: "password is required" })}
          aria-invalid={errors.repeatPassword ? "true" : "false"}
        />
        {errors.repeatPassword && <p>{errors.repeatPassword?.message}</p>}
        <br />
        {error !== "" ? <p>{error}</p> : null}
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
