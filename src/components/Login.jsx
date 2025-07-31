import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema } from "../utils/validation";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const { login } = useAuth();

  const navigate = useNavigate();
  const handleLogin = async (values, { setSubmitting }) => {
    try {
     await login(values);
    toast.success("Login successful!", {
      position: 'top-center',
    });
    navigate("/profile");
    } catch (e) {
      
      toast.error("Login failed" , {
      position: 'top-center',
    });
      
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



// Inside handleLogin



}
