import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema } from "../utils/validation";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Login() {
  const { login } = useAuth();

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      await login(values);
      toast.success("Login successful!");
    } catch (e) {
      toast.error("Login failed");
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
            <Field name="email" type="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" />
            <Field name="password" type="password" placeholder="Password" />
            <ErrorMessage name="password" component="div" />
            <button type="submit" disabled={isSubmitting}>Login</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
