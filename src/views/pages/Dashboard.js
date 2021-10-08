import axios from "axios";
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { isLogin } from "../../Rounting/Authentication";
import Header from "../Layouts/Header";
import Sidebar from "../Layouts/Sidebar";

const Blank = () => {
  let [usercount, setusercounter] = useState("");
  let [categorycount, setcategorycounter] = useState("");
  let [subcategorycount, setsubcategorycounter] = useState("");
  let [productcount, setproductcounter] = useState("");

  useEffect(async () => {
    await axios.get("http://localhost:5050/userscount").then((res) => {
      //console.log(res.data);
      setusercounter(res.data);
    });
    await axios.get("http://localhost:5050/categorycount").then((res) => {
      //console.log(res.data);
      setcategorycounter(res.data);
    });
    await axios.get("http://localhost:5050/subcategorycount").then((res) => {
      //console.log(res.data);
      setsubcategorycounter(res.data);
    });
    await axios.get("http://localhost:5050/productcount").then((res) => {
      // console.log(res.data);
      setproductcounter(res.data);
    });
  }, []);
  return (
    <div>
      <Header />
      <Sidebar />

      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <h1>
            Dashboard
            <small>it all starts here</small>
          </h1>
          <ol className="breadcrumb">
            <li>
              <a href="#">
                <i className="fa fa-dashboard" /> Home
              </a>
            </li>
            <li>
              <a href="#">Examples</a>
            </li>
            <li className="active">Blank page</li>
          </ol>
        </section>
        {/* Main content */}
        <section className="content">
          {/* Default box */}
          <div className="row">
            <div className="col-lg-3 col-xs-6">
              <div className="small-box bg-aqua">
                <div className="inner">
                  <h3>{usercount}</h3>
                  <p>User Registrations</p>
                </div>
                <div className="icon">
                  <i className="ion ion-bag" />
                </div>
                <Link to="/usertable" className="small-box-footer">
                  More info <i className="fa fa-arrow-circle-right" />
                </Link>
              </div>
            </div>
            <div className="col-lg-3 col-xs-6">
              <div className="small-box bg-green">
                <div className="inner">
                  <h3>{categorycount}</h3>
                  <p>Category</p>
                </div>
                <div className="icon">
                  <i className="ion ion-stats-bars" />
                </div>
                <Link to="/Category" className="small-box-footer">
                  More info <i className="fa fa-arrow-circle-right" />
                </Link>
              </div>
            </div>
            <div className="col-lg-3 col-xs-6">
              <div className="small-box bg-yellow">
                <div className="inner">
                  <h3>{subcategorycount}</h3>
                  <p>Sub Category</p>
                </div>
                <div className="icon">
                  <i className="ion ion-person-add" />
                </div>
                <Link to="/SubCategory" className="small-box-footer">
                  More info <i className="fa fa-arrow-circle-right" />
                </Link>
              </div>
            </div>
            <div className="col-lg-3 col-xs-6">
              <div className="small-box bg-red">
                <div className="inner">
                  <h3>{productcount}</h3>
                  <p>Products</p>
                </div>
                <div className="icon">
                  <i className="ion ion-pie-graph" />
                </div>
                <Link to="/Product" className="small-box-footer">
                  More info <i className="fa fa-arrow-circle-right" />
                </Link>
              </div>
            </div>
          </div>

          {/* /.box */}
        </section>
        {/* /.content */}
      </div>
    </div>
  );
};

export default Blank;
