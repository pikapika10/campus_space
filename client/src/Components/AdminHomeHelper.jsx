import React, { useState, useEffect } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { adminLogout } from "../redux/action/adminAction";
import Logo from "../Style/Images/Logo.png";
import { withRouter } from 'react-router';

const Home = () => {
  const store = useSelector((store) => store);
  const [name, setName] = useState("");
  useEffect(() => {
    if (store.admin.admin.name) {
      setName(store.admin.admin.name);
    }
  }, [store.admin.admin.name]);
  const history = useHistory();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(adminLogout());
    history.push("/");
  };
  return (
    <div className=" shadow">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <span>
          <img
            src={Logo}
            alt="Logo"
            height="35px"
            style={{ filter: "invert(1)" }}
          />
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item ">
              <button type="button" className="btn">
                <NavLink exact to="/admin">
                  <li>{name}</li>
                </NavLink>
              </button>
            </li>
            <li className="nav-item">
              <button type="button" className="btn">
                <NavLink exact to="/admin/addFaculty"  activeClassName="active">
                  <li>Add faculty</li>
                </NavLink>
              </button>
            </li>
            <li className="nav-item">
              <button type="button" className="btn">
                <NavLink exact to="/admin/addStudent"  activeClassName="active">
                  <li>Add student</li>
                </NavLink>
              </button>
            </li>
            <li className="nav-item">
              <button type="button" className="btn">
                <NavLink exact to="/admin/addSubject">
                  <li>Add subject</li>
                </NavLink>
              </button>
            </li>
            <li className="nav-item">
              <button type="button" className="btn">
                <NavLink exact to="/admin/addAdmin">
                  <li>Add admin</li>
                </NavLink>
              </button>
            </li>
            <li className="nav-item">
              <button type="button" className="btn">
                <NavLink exact to="/admin/allFaculties">
                  <li>Our faculties</li>
                </NavLink>
              </button>
            </li>
            <li className="nav-item">
              <button type="button" className="btn">
                <NavLink exact to="/admin/allStudents">
                  <li>Our students</li>
                </NavLink>
              </button>
            </li>
            <li className="nav-item">
              <button type="button" className="btn">
                <NavLink exact to="/admin/allSubject">
                  <li>Subjects</li>
                </NavLink>
              </button>
            </li>
          </ul>
        </div>
        <div>
          <button
            style={{ listStyle: "None" }}
            onClick={logoutHandler}
            type="button"
            className="btn"
          >
            <li>Logout</li>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default withRouter(Home);
