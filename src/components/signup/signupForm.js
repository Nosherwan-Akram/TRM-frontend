import { Form, Formik, ErrorMessage, Field } from "formik";
import SignupSchema from "./validation-schema";
import { Link } from "react-router-dom";
import React from "react";
const SignupForm = (props) => {
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        rePassword: "",
        email: "",
      }}
      validationSchema={SignupSchema}
      validate={(values) => {
        const errors = {};
        if (values.password !== values.rePassword) {
          errors.rePassword = "Re typed password is not same";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        console.log(values);
        props.registerHandler({ ...values });
      }}
    >
      {({ isSubmitting }) => (
        <Form className="container-fluid">
          <div className="form-row justify-content-center">
            <div className="form-group col-md-6 col-12">
              <label htmlFor="username">Username</label>
              <Field
                type="text"
                placeholder="User Name"
                name="username"
                className="form-control"
              />
              <ErrorMessage name="username">
                {(msg) => <div className="text-danger">{msg}</div>}
              </ErrorMessage>
            </div>
            <div className="form-group col-md-6 col-12">
              <label htmlFor="email">Email Address</label>
              <Field
                type="email"
                placeholder="Email Address"
                name="email"
                className="form-control"
              />
              <ErrorMessage name="email">
                {(msg) => <div className="text-danger">{msg}</div>}
              </ErrorMessage>
            </div>
            <div className="form-group col-md-6 col-12">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                placeholder="password"
                name="password"
                className="form-control"
              />
              <ErrorMessage name="password">
                {(msg) => <div className="text-danger">{msg}</div>}
              </ErrorMessage>
            </div>
            <div className="form-group col-md-6 col-12">
              <label htmlFor="rePassword">Re Password</label>
              <Field
                type="password"
                placeholder="Re Password"
                name="rePassword"
                className="form-control"
              />
              <ErrorMessage name="rePassword">
                {(msg) => <div className="text-danger">{msg}</div>}
              </ErrorMessage>
            </div>
            <div className="col-md-4 col-12">
              <button
                className="btn btn-success w-100"
                type="submit"
                disabled={isSubmitting}
              >
                Signup
              </button>
              <Link className="btn btn-success w-100 my-1" to="/login">
                Login
              </Link>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
