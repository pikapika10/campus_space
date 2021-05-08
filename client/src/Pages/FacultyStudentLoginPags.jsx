import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { facultyLogin } from "../redux/action/facultyAction";
import { studentLogin } from "../redux/action/studentAction";
import classnames from "classnames";
import StudentLoginLogo from "../Style/Images/student-login.svg";
import Logo from "../Style/Images/Logo.png"

import { Button, Form } from "semantic-ui-react";

import "../Style/facultyStudentLogin.css";

const FacultyStudentLoginPags = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const [facultyRegNum, setFacultyRegNum] = useState("");
  const [facultyPassword, setFacultyPassword] = useState("");
  const [studentRegNum, setStudentRegNum] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [errorsHelper, setErrorsHelper] = useState({});
  const [isFacultyLoading, setIsFacultyLoading] = useState(false);
  const [isStudentLoading, setIsStudentLoading] = useState(false);

  const [showFacultyLogin, setShowFacultyLogin] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (store.faculty.isAuthenticated) {
      history.push("/faculty");
    }
  }, [store.faculty.isAuthenticated]);

  useEffect(() => {
    if (store.error) {
      setErrors(store.error);
    }
  }, [store.error]);
  useEffect(() => {
    if (store.student.isAuthenticated) {
      history.push("/home");
    }
  }, [store.student.isAuthenticated]);

  useEffect(() => {
    if (store.errorHelper) {
      setErrorsHelper(store.errorHelper);
    }
  }, [store.errorHelper]);

  const facultyFormHandler = (e) => {
    e.preventDefault();
    setIsFacultyLoading(true);
    dispatch(
      facultyLogin({
        registrationNumber: facultyRegNum,
        password: facultyPassword,
      })
    );
  };

  useEffect(() => {
    if (store.error || store.faculty.isAuthenticated) {
      setIsFacultyLoading(false);
    } else {
      setIsFacultyLoading(true);
    }
  }, [store.error, store.faculty.isAuthenticated]);

  const studentFormHandler = (e) => {
    e.preventDefault();
    setIsStudentLoading(true);
    dispatch(
      studentLogin({
        registrationNumber: studentRegNum,
        password: studentPassword,
      })
    );
  };

  useEffect(() => {
    if (store.errorHelper || store.student.isAuthenticated) {
      setIsStudentLoading(false);
    } else {
      setIsStudentLoading(false);
    }
  }, [store.errorHelper, store.student.isAuthenticated]);

  return (
      <div className="row mx-0" id="trail" style={{ height: "100vh" }}>
        <span style={{
          position:"absolute",
          top:"5px",
          left:"15px"
        }} ><img src={Logo} alt="Logo" height="35px" /></span>
        <div className="col-6 m-auto text-center">
          <img src={StudentLoginLogo} alt="StudentLoginLogo" height="400px" />
        </div>
        <div
          className="col-md-5 px-5 m-auto bg-light rounded pt-5"
          style={{
            height: "90vh",
            overflowY: "auto",
          }}
        >
          {showFacultyLogin ? (
            <div>
              <h3 className=" jumbotron text-secondary">
                <h2 className="text-dark">Faculty Login</h2>
                <p>
                  <small>
                    Please login using your registraion number and password...
                  </small>
                </p>
              </h3>
              <Form noValidate onSubmit={facultyFormHandler}>
                <Form.Field>
                  <Form.Input
                    error={
                      errors.registrationNumber && {
                        content: errors.registrationNumber,
                        pointing: "below",
                      }
                    }
                    icon="users"
                    iconPosition="left"
                    fluid
                    label="Registration Number"
                    placeholder="Registration Number"
                    id="form-input-Registration Number"
                    onChange={(e) => {
                      setFacultyRegNum(e.target.value);
                      setErrors({});
                    }}
                    type="text"
                    value={facultyRegNum}
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    error={
                      errors.password && {
                        content: errors.password,
                        pointing: "below",
                      }
                    }
                    fluid
                    icon="lock"
                    iconPosition="left"
                    label="Password"
                    id="form-input-Registration Number"
                    onChange={(e) => {
                      setFacultyPassword(e.target.value);
                      setErrors({});
                    }}
                    placeholder="Password"
                    type="password"
                    value={facultyPassword}
                  />
                </Form.Field>
                <div className="text-right">
                  <Button type="submit" primary>
                    <i class="fas fa-sign-in-alt mr-1"></i>Login
                  </Button>
                </div>
              </Form>
              <div className=" text-center my-2 ">
                <span
                  className="cp text-info"
                  onClick={() => setShowFacultyLogin(false)}
                >
                  Go to student login
                </span>
              </div>
            </div>
          ) : (
            <div>
              <h3 className=" jumbotron text-secondary">
                <h2 className="text-dark">Student Login</h2>
                <p>
                  <small>
                    Please login using your registraion number and password...
                  </small>
                </p>
              </h3>
              <Form noValidate onSubmit={studentFormHandler}>
                <Form.Field>
                  <Form.Input
                    error={
                      errorsHelper.registrationNumber && {
                        content: errorsHelper.registrationNumber,
                        pointing: "below",
                      }
                    }
                    icon="users"
                    iconPosition="left"
                    fluid
                    label="Registration Number"
                    placeholder="Registration Number"
                    id="form-input-Registration Number"
                    onChange={(e) => {
                      setStudentRegNum(e.target.value);
                      setErrorsHelper({});
                    }}
                    type="text"
                    value={studentRegNum}
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    error={
                      errorsHelper.password && {
                        content: errorsHelper.password,
                        pointing: "below",
                      }
                    }
                    fluid
                    icon="lock"
                    iconPosition="left"
                    label="Password"
                    id="form-input-Registration Number"
                    onChange={(e) => {
                      setStudentPassword(e.target.value);
                      setErrorsHelper({});
                    }}
                    placeholder="Password"
                    type="password"
                    value={studentPassword}
                  />
                </Form.Field>
                <div className="text-right">
                  <Button type="submit" primary>
                    <i class="fas fa-sign-in-alt mr-1"></i>Login
                  </Button>
                </div>
              </Form>

              <div className=" text-center my-2 ">
                <span
                  className="cp text-info"
                  onClick={() => setShowFacultyLogin(true)}
                >
                  Go to faculty login
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    
  );
};

export default FacultyStudentLoginPags;
