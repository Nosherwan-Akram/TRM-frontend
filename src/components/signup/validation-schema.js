import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid Email Address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password should be minimum 8 length")
    .required("Password is required"),
  rePassword: Yup.string()
    .min(8, "Retype password length should also be same")
    .required("Plz re type password"),
});
export default SignupSchema;
