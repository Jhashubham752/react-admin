import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Field, Formik, ErrorMessage, Form } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login, isLogin } from "../../Rounting/Authentication";

import axios from "axios";

const Login = () => {
  const [redirect, setRedirect] = useState(false);

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setSubmitting(false);
      await axios.post("http://localhost:5050/signin", values).then((res) => {
        let data = res.data;
        let user = res.data.user;
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(user));
        setRedirect(true);
        resetForm({});
      });
    } catch (err) {
      console.log(err.response);
      toast.error(err.response.data.message);
    }
  };

  return (
    <>
      {redirect && <Redirect to="/" />}

      <div className="login-box">
        <div className="login-logo">
          <Link to="/">
            <b>LOG</b>IN
          </Link>
        </div>
        <div className="login-box-body">
          <p className="login-box-msg">Sign in to start your session</p>

          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              return errors;
            }}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                {isLogin() && <Redirect to="/" />}

                <div className="form-group has-feedback">
                  <Field
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                  />
                  <span className="glyphicon glyphicon-envelope form-control-feedback" />
                  <ErrorMessage name="email" component="div" />
                </div>
                <div className="form-group has-feedback">
                  <Field
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                  />
                  <span className="glyphicon glyphicon-lock form-control-feedback" />
                  <ErrorMessage name="password" component="div" />
                </div>
                <div className="row">
                  <div className="col-xs-8">
                    <div className="checkbox icheck">
                      <label>
                        <input type="checkbox" /> Remember Me
                      </label>
                    </div>
                  </div>

                  <div className="col-xs-4">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block btn-flat"
                      disabled={isSubmitting}
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>

          <a href="#">I forgot my password</a>
          <br />
          <Link to="/signup" className="text-center">
            Register a new membership
          </Link>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Login;
