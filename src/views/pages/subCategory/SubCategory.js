import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useFormik } from "formik";
import * as Yup from "yup";
import ReactPaginate from "react-paginate";
import Header from "../../Layouts/Header";
import Sidebar from "../../Layouts/Sidebar";
import Toggle from "react-toggle";
import Swal from "sweetalert2";
import Select from "react-select";

import { useModal } from "react-hooks-use-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Category/Toogle.css";
import { add, values } from "lodash";

const SubCategory = () => {
  const [category, setcategory] = useState([]);
  const [page, setPage] = useState(1);
   const [newCategoryId, setNewCategoryId] = useState({});
  const [categoryvalue, setcategoryvalue] = useState("");
  const [modalType, setmodalType] = useState();
  const [value, setvalues] = useState({
    categoryId: "",
    title: "",
    image: "",
  });

  const [categoryId, subCategoryId] = useState([]);

  // const options = [
  //   { value: "chocolate", label: "Chocolate" },
  //   { value: "strawberry", label: "Strawberry" },
  //   { value: "vanilla", label: "Vanilla" },
  // ];

 const selectcategory = (e) => {
   let id = e.target.value;
    setNewCategoryId(id);
   setcategoryvalue(id);
 
 };

  const [Modal, open, close, isOpen] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: false,
  });
  const openModal = (modaltype) => {
    getcategoryId();
    open();
    setmodalType(modaltype);
  };

  const closeModal = (modaltype) => {
    close();
    setmodalType("");
  };

  const getUserList = () => {
    axios
      .get(
        `http://localhost:5050/subcategory?current_page=${page.per_page}&per_page=${page.currentpage}`
      )
      .then((res) => {
        console.log(res.data);
        setPage(res.data);
        setcategory(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (event, value) => {
    setPage(value);
  };

  //============Toggle change================
  const handleChangeDays = (e, id) => {
    const { name, value, checked } = e.target;
    toggleUpdate(id, checked);
  };

  async function toggleUpdate(id, checked) {
    let data = {};
    data["status"] = checked;
    await axios
      .put(`http://localhost:5050/substatus/${id}`, data)
      .then((res) => {
        console.log(res, "======================================");
      });
  }

  // =======================add category===============================
  const addcategory = useFormik({
    initialValues: {
      categoryId: "",
      title: "",
      image: "",
    },

    validationSchema: Yup.object({
      title: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      //image: Yup.mixed().required(),
    }),

    onSubmit: async ({ title, image, categoryId }) => {
      try {
        // setSubmitting(false);
        var formdata = new FormData();
        formdata.append("categoryId", categoryId);
        formdata.append("title", title);
        formdata.append("image", image);
        const option = {
          headers: { "Content-Type": "multipart/form-data" },
        };

        await axios
          .post("http://localhost:5050/subcategory", formdata, option)
          .then((res) => {
            setcategory((prev) => {
              return [...prev, res.data];
            });

            close();

            toast.success("Category Added Successfully");
          });
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message);
      }
    },
  });
  //================Add category ends here===================//

  //=============Edit Category=======================//
  const edit = useFormik({
    initialValues: value,
    enableReinitialize: true,

    validationSchema: Yup.object({
      title: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      // image: Yup.mixed().required(),
      // password: Yup.string().required("Please provide a valid password"),
    }),

    onSubmit: async ({ title, image }) => {
      try {
        var formdata = new FormData();
        formdata.append("categoryId", newCategoryId);
        formdata.append("title", title);
        formdata.append("image", image);
        const option = {
          headers: { "Content-Type": "multipart/form-data" },
        };
        await axios
          .put(`http://localhost:5050/Subcategory/${value._id}`, formdata)
          .then((res) => {
            console.log("=========================", res.data);

            axios.get("http://localhost:5050/subcategory").then((res) => {
              // console.log(res.data.user);
              setcategory(res.data.user);

              toast.success("Category Edited Successfully");

              // setdata(res.data);
              close();
            });
          });
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message);
      }
    },
  });

  //======================Edit Category button ==========

  const getcategoryId = async () => {
    await axios.get("http://localhost:5050/category").then((res) => {
      console.log(res.data.user);
      subCategoryId(res.data.user);
    });
  };

  const onSubmit = async (id) => {
    try {
      console.log(id);
      await axios
        .get(`http://localhost:5050/getsubcategory/${id}`)
        .then((res) => {
          console.log(res.data, "((((((((((((((((((((*******");
          setvalues(res.data);
          setcategoryvalue(res.data.categoryId);
          openModal("edit");
          // edit.setFieldValue("category", res.data.categoryId);
          // edit.setFieldValue("title", res.data.title);
        });
    } catch (err) {
      // toast.error(err.res.data);
      console.log(err);
    }
  };
  //=======================delete button===========================
  const category_delete = (id) => {
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
          .delete(`http://localhost:5050/subcategory/${id}`)
          .then((res) => setcategory(res.data));
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
      }
    });
  };

  // =====================================================================
  useEffect(() => {
    getUserList();
  }, [setcategory]);

  return (
    <>
      <Header />
      <Sidebar />
      <div className="content-wrapper">
        <div className="box">
          <div className="box-header">
            <h3 className="box-title"> Sub Category</h3>
            <i
              class="fa fa-user-plus"
              // data-toggle="modal"
              //   data-target="#modal-info"
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
                  <th>Title</th>
                  <th>Image</th>
                  <th>status</th>
                  <th>Action</th>
                </tr>
              </thead>

              {category.map((data) => {
                //console.log(data, "=+++++=+++++++++++++++++++++++++++++");
                return (
                  <tbody>
                    <tr>
                      <td>{data.title}</td>
                      <td>
                        <img
                          src={`http://localhost:5050/images/${data.image}`}
                          style={{ width: "50px" }}
                        />
                      </td>
                      <td>
                        <Toggle
                          id="cheese-status"
                          name="sunday"
                          defaultChecked={data.status}
                          //checked={data.status}
                          onChange={(e) => handleChangeDays(e, data._id)}
                        />
                      </td>
                      <td>
                        <i
                          class="fa fa-pencil-square-o"
                          style={{
                            fontSize: "27px",
                            marginRight: "11px",
                            cursor: "pointer",
                          }}
                          onClick={() => onSubmit(data._id)}
                        />
                        <i
                          class="fa fa-trash"
                          style={{ fontSize: "27px", cursor: "pointer" }}
                          onClick={() => category_delete(data._id)}
                        />
                      </td>
                    </tr>
                  </tbody>
                );
              })}

              <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                pageCount={page.current_page}
                onPageChange={() => setPage()}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
              />
            </table>
          </div>
        </div>

        {/* =================add Product========================= */}
        {modalType == "add" ? (
          <Modal>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" onClick={close}>
                    <span aria-hidden="true">×</span>
                  </button>
                  <h4 className="modal-title">Add Category</h4>
                </div>

                <div
                  className="modal-body"
                  style={{
                    height: "286px",
                    backgroundColor: "#d0d5d6 !important",
                  }}
                >
                  <form onSubmit={addcategory.handleSubmit}>
                    <div className="form-group has-feedback">
                      <select
                        className="form-control"
                        id="categoryId"
                        name="categoryId"
                        onChange={addcategory.handleChange}
                      >
                        <option> Select Category</option>
                        {categoryId.length > 0 &&
                          categoryId.map((c, index) => {
                            // console.log(c._id);
                            return <option value={c._id}>{c.title}</option>;
                          })}
                      </select>
                      <input
                        style={{ "margin-top": "20px" }}
                        type="text"
                        className="form-control"
                        placeholder="Title"
                        id="title"
                        name="title"
                        onChange={addcategory.handleChange}
                        onBlur={addcategory.handleBlur}
                        value={addcategory.values.title}
                      />
                      {addcategory.touched.title && addcategory.errors.title ? (
                        <div style={{ color: "red" }}>
                          {addcategory.errors.tile}
                        </div>
                      ) : null}
                      <span className="glyphicon glyphicon-user form-control-feedback" />
                    </div>
                    <div className="form-group has-feedback">
                      <input
                        type="file"
                        className="form-control"
                        placeholder="image"
                        id="image"
                        name="image"
                        onChange={(e) => {
                          console.log(e.target.files[0]);
                          addcategory.setFieldValue("image", e.target.files[0]);
                        }}
                        onBlur={addcategory.handleBlur}
                        value={addcategory.values.file}
                      />
                      {addcategory.touched.image && addcategory.errors.image ? (
                        <div style={{ color: "red" }}>
                          {addcategory.errors.image}
                        </div>
                      ) : null}
                      <span className="glyphicon glyphicon-envelope form-control-feedback" />
                    </div>
                    <>
                      <div className="col-xs-4">
                        <div className="pull-left">
                          <button
                            type="submit"
                            className="btn btn-primary btn-block btn-flat"
                          >
                            Submit
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

        {/* //==========================Edit Subcategory=============== */}
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
                    <h4 className="modal-title">Edit Category</h4>
                  </div>

                  <div className="modal-body" style={{ height: "286px" }}>
                    <select
                      className="form-control"
                      id="categoryId"
                      name="categoryId"
                      onChange={(e) => selectcategory(e)}
                      value={categoryvalue}
                    >
                      {categoryId.length > 0 &&
                        categoryId.map((c, index) => {
                          return <option value={c._id}>{c.title}</option>;
                        })}
                    </select>

                    <form onSubmit={edit.handleSubmit}>
                      <div
                        className="form-group has-feedback"
                        style={{ "margin-top": "20px" }}
                      >
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Title"
                          id="title"
                          name="title"
                          onChange={edit.handleChange}
                          onBlur={edit.handleBlur}
                          value={edit.values.title}
                        />
                        {edit.touched.title && edit.errors.title ? (
                          <div style={{ color: "red" }}>
                            {edit.errors.title}
                          </div>
                        ) : null}
                        <span className="glyphicon glyphicon-user form-control-feedback" />
                      </div>
                      <div className="form-group has-feedback">
                        <input
                          type="file"
                          className="form-control"
                          placeholder="image"
                          id="image"
                          name="image"
                          onChange={(e) => {
                            // console.log(e.target.files[0]);
                            edit.setFieldValue("image", e.target.files[0]);
                          }}
                          onBlur={edit.handleBlur}
                          // value={edit.values.image}
                        />
                        {edit.touched.image && edit.errors.image ? (
                          <div style={{ color: "red" }}>
                            {edit.errors.image}
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
      </div>
      <ToastContainer />
    </>
  );
};

export default SubCategory;
