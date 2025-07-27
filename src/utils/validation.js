import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const candidateSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().min(6).required("Password is required"),
});
