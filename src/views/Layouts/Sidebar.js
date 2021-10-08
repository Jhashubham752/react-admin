import React from "react";
import { Link, NavLink } from "react-router-dom";
import { getItems } from "../../Rounting/Authentication";

function Sidebar() {
  return (
    <div>
      <aside className="main-sidebar">
        <section className="sidebar">
          <div className="user-panel"></div>

          <ul className="sidebar-menu">
            <li className="header">MAIN NAVIGATION</li>
            <li className="active treeview">
              <Link to="/">
                <i className="fa fa-dashboard" /> <span>Dashboard</span>
              </Link>

              <Link to="/usertable">
                <i className="fa fa-user" /> <span>USER</span>
              </Link>

              <Link to="/category">
                <i class="fa fa-list-alt" aria-hidden="true" />
                <span> Category</span>
              </Link>
              <Link to="/subcategory">
                <i class="fa fa-list-alt" aria-hidden="true" />
                <span> Sub Category</span>
              </Link>

              <Link to="/product">
                <i class="fa fa-product-hunt" aria-hidden="true" />
                <span> Product</span>
              </Link>

              <Link to="/Editior">
                <i class="fa fa-grav" aria-hidden="true" /> <span>CMS</span>
              </Link>
            </li>
          </ul>
        </section>
      </aside>
    </div>
  );
}

export default Sidebar;
