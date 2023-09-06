import * as yup from "yup";

const userSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must have at least 8 characters")
    // .test("password special char","Password must contain at least 1 special char",(value)=>{
    //     return value.match(/^(?=.*[@$!%*?&'])[A-Za-z\d@$!%*?&']+$/)
    // })
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&'])[A-Za-z\d@$!%*?&']+$/,
      "Password must contain at least 1 uppercase letter, at least 1 number and at least 1 special character. "
    )
});

export default userSchema;
