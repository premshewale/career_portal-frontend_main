import { Formik, Form, Field, ErrorMessage } from "formik";
import { candidateSchema } from "../utils/validation";
import { registerCandidate } from "../services/candidateService";
import { toast } from "react-toastify";

export default function RegisterCandidate() {
  const handleRegister = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => formData.append(key, values[key]));
      await registerCandidate(formData);
      toast.success("Candidate registered!");
    } catch {
      toast.error("Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-card">
      <h2>Register as Candidate</h2>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          mobile: "",
          resume: null,
        }}
        validationSchema={candidateSchema}
        onSubmit={handleRegister}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form>
            <Field name="username" placeholder="Username" />
            <ErrorMessage name="username" component="div" />
            <Field name="email" type="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" />
            <Field name="password" type="password" placeholder="Password" />
            <ErrorMessage name="password" component="div" />
            <input type="file" onChange={(e) => setFieldValue("resume", e.target.files[0])} />
            <button type="submit" disabled={isSubmitting}>Register</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
