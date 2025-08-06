import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(4, "Too short").required("Password is required"),
});

export default function Login() {
  const { loginUser, loginCompany } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      // Try candidate login first
      await loginUser(values);
      toast.success("Candidate login successful!", {
      position: 'top-center',
    });
      navigate("/candidate");
    } catch (e1) {
      try {
        // If candidate login fails, try company login
        await loginCompany(values);
        toast.success("Company login successful!", {
      position: 'top-center',
    });
        navigate("/company");
      } catch (e2) {
        toast.error("Login failed: Invalid credentials", {
      position: 'top-center',
    });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-card">
      <h2>Login</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <Field  name="email" type="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div>
              <Field name="password" type="password" placeholder="Password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <button type="submit" disabled={isSubmitting}>Login</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
