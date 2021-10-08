import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../Layouts/Header";
import Sidebar from "../../Layouts/Sidebar";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import { getItems } from "../../../Rounting/Authentication";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [values, setvalues] = useState({
    fullName: "",
    email: "",
  });

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:5050/users/${getItems()._id}`, values)
        .then((res) => {
          setvalues(res.data);
          editUser.setFieldValue("fullName", res.data.fullName);
          editUser.setFieldValue("email", res.data.email);
        });
    } catch (err) {
      console.log(err.response);
    }
  }, [setvalues]);

  const editUser = useFormik({
    initialValues: values,
    validationSchema: Yup.object({
      fullName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(false);
        await axios
          .put(`http://localhost:5050/users/${getItems()._id}`, values)
          .then((res) => {
            setvalues(res.data);
          });
      } catch (err) {
        toast.error(err.response.data);
      }
    },
  });

  return (
    <div>
      <Header value={values.fullName} />
      <Sidebar />
      <div
        className="box box-primary"
        style={{
          width: "500px",
          marginTop: "77px",
          border: "1px solid green",
          padding: "18px",
          float: "right",
          marginRight: "31px",
        }}
      >
        <div className="box-body box-profile">
          <img
            className="profile-user-img img-responsive img-circle"
            src="assest/Images/avatar5.png"
            alt="User profile picture"
          />
          <h3 className="profile-username text-center">{values.fullName}</h3>
          <p className="text-muted text-center">React Speciallist</p>
          <ul className="list-group list-group-unbordered">
            <li className="list-group-item">
              <b>{values.fullName}</b> <a className="pull-right"></a>
            </li>
            <li className="list-group-item">
              <b>{values.email}</b> <a className="pull-right"></a>
            </li>
            <li className="list-group-item">
              <b>123456789</b> <a className="pull-right"></a>
            </li>
          </ul>
        </div>
      </div>
      <div
        className="nav-tabs-custom"
        style={{
          width: "500px",
          marginTop: "77px",
          border: "1px solid green",
          padding: "18px",
          float: "right",
          marginRight: "31px",
        }}
      >
        <h2> Update Profile</h2>
        <form onSubmit={editUser.handleSubmit}>
          <div className="form-group has-feedback">
            <input
              type="text"
              className="form-control"
              placeholder="Full name"
              id="fullName"
              name="fullName"
              onChange={editUser.handleChange}
              onBlur={editUser.handleBlur}
              value={editUser.values.fullName}
            />
            {editUser.touched.fullName && editUser.errors.fullName ? (
              <div style={{ color: "red" }}>{editUser.errors.fullName}</div>
            ) : null}
            <span className="glyphicon glyphicon-user form-control-feedback" />
          </div>
          <div className="form-group has-feedback">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              id="email"
              name="email"
              type="text"
              onChange={editUser.handleChange}
              onBlur={editUser.handleBlur}
              value={editUser.values.email}
            />
            {editUser.touched.email && editUser.errors.email ? (
              <div style={{ color: "red" }}>{editUser.errors.email}</div>
            ) : null}
            <span className="glyphicon glyphicon-envelope form-control-feedback" />
          </div>
          <>
            <div className="col-xs-4">
              <button
                type="submit"
                className="btn btn-primary btn-block btn-flat"
              >
                Update User
              </button>
            </div>
          </>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Profile;
