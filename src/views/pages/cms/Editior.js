import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import axios from "axios";

import "./Editior.css";
import Header from "../../Layouts/Header";
import Sidebar from "../../Layouts/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Editior() {
  const [data, setdata] = useState();
  const [id, setId] = useState();
  const [text, settext] = useState();

  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1", text);

  const aboutUs = () => {
    try {
      axios
        .get("http://localhost:5050/getabout/614db09498da55dc89c3b94f")
        .then((res) => {
          console.log(res);
          setdata(res.data.discription);
          setId(res.data._id);
        //   console.log(res.data);
        });
    } catch (err) {
      console.log(err.response);
    }
  };

  const contactUs = () => {
    try {
      axios
        .get("http://localhost:5050/getcontactus/614dc13a4cd40c91eb09d5f1")
        .then((res) => {
          setdata(res.data.discription);
          setId(res.data._id);
        });
    } catch (err) {
      console.log(err.response);
    }
  };

  const termCondition = () => {
    try {
      axios
        .get("http://localhost:5050/getterm/614dc1294cd40c91eb09d5ef")
        .then((res) => {
          setdata(res.data.discription);
          setId(res.data._id);
        });
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    aboutUs();
  }, []);

  const updateAlldata = (e) => {
    e.preventDefault();
    try {
      console.log(text, "text");
      axios.put(`http://localhost:5050/update/${id}`, { text }).then((res) => {
        // console.log(res, "hjfhhhhhhhhhhhhhhhhhhhhhhhhhh");

        setdata(data);
        toast.success(" CMS updated");
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onChangeInEditor = (event, editor) => {
    const data = editor.getData();
    console.log({ event, editor, data });
    settext(data);
  };

  return (
    <>
      <Header />
      <Sidebar />

      <div className="content-wrapper">
        <div className="style">
          <button type="submit" class="btn btn-success" onClick={aboutUs}>
            About Us
          </button>
          <button type="submit" class="btn btn-primary" onClick={contactUs}>
            Contact Us
          </button>
          <button type="submit" class="btn btn-danger" onClick={termCondition}>
            Terms and Conditions
          </button>
        </div>
        <CKEditor
          editor={ClassicEditor}
          data={data}
          onReady={(editor) => {
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            onChangeInEditor(event, editor);
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
        <button type="submit" class="btnn pull-right" onClick={updateAlldata}>
          Update
        </button>
        <ToastContainer />
      </div>
    </>
  );
}

export default Editior;
