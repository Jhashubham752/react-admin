import axios from "axios";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { getItems } from "../../../Rounting/Authentication";
import Header from "../../Layouts/Header";
import Sidebar from "../../Layouts/Sidebar";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import { useModal } from "react-hooks-use-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PER_PAGE = 5;

const User_table = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setdata] = useState([]);

  const [value, setvalues] = useState({
    fullName: "",
    email: "",
  });

  const [Modal, open, close, isOpen] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: false,
  });

  const openModal = (modaltype) => {
    open();
    setmodalType(modaltype);
  };

  const closeModal = (modaltype) => {
    close();
    setmodalType("");
  };

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  const offset = currentPage * PER_PAGE;
  //======================react pagination =====================//
  const currentPageData = data.slice(offset, offset + PER_PAGE).map((user) => {
    console.log("######################", user);
    return (
      <tr>
        <td>{user._id}</td>
        <td>{user.fullName}</td>
        <td>{user.email}</td>
        <td>
          <i
            class="fa fa-pencil-square-o"
            style={{
              fontSize: "27px",
              marginRight: "11px",
              cursor: "pointer",
            }}
            onClick={() => onSubmit(user._id)}
          />

          <i
            class="fa fa-trash"
            style={{ fontSize: "27px", cursor: "pointer" }}
            onClick={() => user_delete(user._id)}
          />
        </td>
      </tr>
    );
  });

  const pageCount = Math.ceil(data.length / PER_PAGE);

  const [modalType, setmodalType] = useState();

  // const modal = () => {
  //   if (modalType == 1) {
  //     return setmodalType == edit;
  //   } else {
  //     return setmodalType == formik;
  //   }
  // };

  //============================delete user=======================//
  useEffect(() => {
    axios.get("http://localhost:5050/users/").then((res) => {
      // console.log(res.data);
      setdata(res.data);
    });
  }, []);
  //==================================delete button ==============================
  const user_delete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        axios
          .delete(`http://localhost:5050/users/${id}`)
          .then((res) => setdata(res.data));
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
      }
    });
  };
  //==============================delete Button ends ========================//

  //===============Edit Button ========================//
  const onSubmit = async (id) => {
    try {
      console.log(id);
      await axios.get(`http://localhost:5050/users/${id}`).then((res) => {
        // console.log(res.data);
        setvalues(res.data);
        openModal("edit");
        edit.setFieldValue("fullName", res.data.fullName);
        edit.setFieldValue("email", res.data.email);
      });
    } catch (err) {
      // toast.error(err.res.data);
      console.log(err);
    }
  };

  //==============================Edit Button ends ========================//

  //=========================================Add user==============================//
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Please provide a valid password"),
    }),

    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setSubmitting(false);
        await axios.post("http://localhost:5050/users", values).then((res) => {
          setdata((prev) => {
            return [...prev, res.data];
          });
          resetForm({});
          close();
          toast.success("User Added Successfully");
        });
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message);
      }
    },
  });
  //====================Edit ==================================//
  const edit = useFormik({
    initialValues: value,

    validationSchema: Yup.object({
      fullName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      // password: Yup.string().required("Please provide a valid password"),
    }),

    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setSubmitting(false);
        console.log("values", value);

        await axios
          .put(`http://localhost:5050/users/${value._id}`, values)
          .then((res) => {
            console.log("=========================", res.data);

            axios.get("http://localhost:5050/users/").then((res) => {
              // console.log(res.data);
              setdata(res.data);

              toast.success("User Edited Successfully");

              // setdata(res.data);
              close();
              resetForm({});
            });
          });
      } catch (err) {
        console.log(err);
        toast.error("User not edited");
      }
    },
  });
  //=====================Edit button ends here=======================//
  console.log("MODAL TYPE", modalType);
  return (
    <div>
      <Header />
      <Sidebar />
      <div className="content-wrapper">
        <div className="box">
          <div className="box-header">
            <h3 className="box-title">USER Data Table</h3>
            <i
              class="fa fa-user-plus"
              data-toggle="modal"
              data-target="#modal-info"
              style={{
                float: "right",
                padding: "0px 42px 2px",
                fontSize: "35px",
                cursor: "pointer",
              }}
              onClick={() => openModal("add")}
            />
          </div>

          <div class="box-body">
            <table id="example1" class="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>Email</th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentPageData}
                <ReactPaginate
                  previousLabel={"← Previous"}
                  nextLabel={"Next →"}
                  pageCount={pageCount}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  previousLinkClassName={"pagination__link"}
                  nextLinkClassName={"pagination__link"}
                  disabledClassName={"pagination__link--disabled"}
                  activeClassName={"pagination__link--active"}
                />
              </tbody>
            </table>
          </div>
        </div>
        {/* ======================== Edit USER============================================ */}

        {modalType == "edit" ? (
          <Modal>
            <div>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={close}
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                    <h4 className="modal-title">Edit Form</h4>
                  </div>
                  <div className="modal-body" style={{ height: "286px" }}>
                    <form onSubmit={edit.handleSubmit}>
                      <div className="form-group has-feedback">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Full name"
                          id="fullName"
                          name="fullName"
                          onChange={edit.handleChange}
                          onBlur={edit.handleBlur}
                          value={edit.values.fullName}
                        />
                        {edit.touched.fullName && edit.errors.fullName ? (
                          <div style={{ color: "red" }}>
                            {edit.errors.fullName}
                          </div>
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
                          onChange={edit.handleChange}
                          onBlur={edit.handleBlur}
                          value={edit.values.email}
                        />
                        {edit.touched.email && edit.errors.email ? (
                          <div style={{ color: "red" }}>
                            {edit.errors.email}
                          </div>
                        ) : null}
                        <span className="glyphicon glyphicon-envelope form-control-feedback" />
                      </div>
                      <>
                        <div className="col-xs-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-block btn-flat"
                          >
                            Edit User
                          </button>
                        </div>
                      </>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        ) : (
          ""
        )}
        {/*================================= Add User ======================================== */}
        {modalType == "add" ? (
          <Modal>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" onClick={close}>
                    <span aria-hidden="true">×</span>
                  </button>
                  <h4 className="modal-title">Add User</h4>
                </div>
                <div
                  className="modal-body"
                  style={{
                    height: "286px",
                    backgroundColor: "#d0d5d6 !important",
                  }}
                >
                  <form onSubmit={formik.handleSubmit}>
                    <div className="form-group has-feedback">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Full name"
                        id="fullName"
                        name="fullName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.fullName}
                      />
                      {formik.touched.fullName && formik.errors.fullName ? (
                        <div style={{ color: "red" }}>
                          {formik.errors.fullName}
                        </div>
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
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div style={{ color: "red" }}>
                          {formik.errors.email}
                        </div>
                      ) : null}
                      <span className="glyphicon glyphicon-envelope form-control-feedback" />
                    </div>
                    <div className="form-group has-feedback">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        id="password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <div style={{ color: "red" }}>
                          {formik.errors.password}
                        </div>
                      ) : null}
                      <span className="glyphicon glyphicon-lock form-control-feedback" />
                    </div>
                    <>
                      <div className="col-xs-4">
                        <div className="pull-left">
                          <button
                            type="submit"
                            className="btn btn-primary btn-block btn-flat"
                          >
                            Add User
                          </button>
                        </div>
                        <div className="pull-right">
                          {/* <button
                            type="submit"
                            className="btn btn-primary btn-block btn-flat"
                            onClick={close}
                          >
                            Close
                          </button> */}
                        </div>
                      </div>
                    </>
                  </form>
                </div>
              </div>
            </div>
          </Modal>
        ) : (
          ""
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default User_table;
