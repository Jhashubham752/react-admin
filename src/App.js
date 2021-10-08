import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Dashboard from "./views/pages/Dashboard";
import Login from "./views/Auth/Login";
import Register from "./views/Auth/Register/Register";
import PublicRoute from "./Rounting/PublicRoute";
import PrivateRoute from "./Rounting/PrivateRoute";
import axios from "axios";
import Profile from "./views/pages/Profile/Profile";
import User_table from "./views/pages/user/User_table";

import Editior from "./views/pages/cms/Editior";
import Category from "./views/pages/Category/Category";
import SubCategory from "./views/pages/subCategory/SubCategory";
import Product from "./views/pages/Product/Product";

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <PublicRoute
            restricted={false}
            component={Login}
            path="/signin"
            exact
          />
          <PublicRoute
            restricted={false}
            component={Register}
            path="/signup"
            exact
          />
          <PrivateRoute component={Dashboard} path="/" exact />
          <PrivateRoute component={Profile} path="/profile" />
          <PrivateRoute component={User_table} path="/usertable" />
          <PrivateRoute component={Editior} path="/Editior" />
          <PrivateRoute component={Category} path="/Category" />
          <PrivateRoute component={SubCategory} path="/SubCategory" />
          <PrivateRoute component={Product} path="/Product" />
          {/* 
          <Route path="/profile" component={Profile}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/signup" component={Register}></Route>
          <Route path="/" component={Blank}></Route> */}
        </Switch>
      </Router>
    </>
  );
}

export default App;
