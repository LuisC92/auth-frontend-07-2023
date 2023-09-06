import * as yup from "yup";

const editProfileSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  image: yup
    .mixed()
    .required("please select an image")
    .test(
      "fileType",
      "Invalid file format, please use jpeg, gif, or png.",
      (value) => {
        if (!value || value.length === 0) return true; // skip the verification
        return ["image/jpeg", "image/png", "image/gif"].includes(value[0].type);
      }
    )
    .test("fileSize", "File size is too large. max size: 5MB", (value) => {
      if (!value || value.length === 0) return true; // skip the verification
      return value[0].size <= 5 * 1024 * 1024; // 5MB
    }),
});

export default editProfileSchema;
