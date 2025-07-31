import { Formik, Form, Field } from "formik";
import { registerCompany } from "../../services/companyService";
import { toast } from "react-toastify";

import "../../styles/Company/registercompany.css"

export default function RegisterCompany() {
  const handleRegister = async (values, { setSubmitting }) => {
    try {
      await registerCompany(values);
      toast.success("Company registered!");
    } catch {
      toast.error("Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-card">
      <h2>Register as Company</h2>
      <Formik initialValues={{ name: "", email: "", password: "" }} onSubmit={handleRegister}>
        {({ isSubmitting }) => (
          <Form>
            <Field name="name" placeholder="Company Name" />
            <Field name="email" type="email" placeholder="Email" />
            <Field name="password" type="password" placeholder="Password" />
            <button type="submit" disabled={isSubmitting}>Register</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
