import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { facultyLogin } from "../redux/action/facultyAction";
import { studentLogin } from "../redux/action/studentAction";
import classnames from "classnames";
import StudentLoginLogo from "../Style/Images/student-login.svg";
import Logo from "../Style/Images/Logo.png";

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
  const [isLogging, setIsLogging] = useState(false)

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
    if(isLogging) return;
    setIsLogging(true);
    dispatch(
      facultyLogin({
        registrationNumber: facultyRegNum,
        password: facultyPassword,
      })
    ).then(()=> setIsLogging(false));
  };


  const studentFormHandler = (e) => {
    e.preventDefault();
    if(isLogging) return;
    setIsLogging(true);
    dispatch(
      studentLogin({
        registrationNumber: studentRegNum,
        password: studentPassword,
      })
    ).then(()=> setIsLogging(false));
  };

  return (
    <div className="row mx-0" id="trail" style={{ height: "100vh" }}>
      <span
        style={{
          position: "absolute",
          top: "5px",
          left: "15px",
        }}
      >
        <img src={Logo} alt="Logo" height="35px" />
      </span>
      <div className="col-6 m-auto text-center d-none d-md-block ">
        <img src={StudentLoginLogo} alt="StudentLoginLogo" height="400px" />
      </div>
      <div
        className="col-md-5 px-5 m-auto bg-light rounded pt-5"
        style={{
          height: "85vh",
          overflowY: "auto",
        }}
      >
        {showFacultyLogin ? (
          <div>
            <h3 className=" jumbotron text-secondary py-3">
            <div className="text-center" >
             <img src="https://www.freepnglogos.com/uploads/teacher-png/teacher-teachers-icon-flatastic-iconset-custom-icon-design-36.png" className="" height="100px" width="100px" />
             </div >
             <div className="text-center" >
              <h2 className="text-dark my-1">Faculty Login</h2>
              <p className="my-1" >
                <small>
                  Please login using your registration number and password...
                </small>
              </p>
              </div>
            </h3>
            <Form noValidate onSubmit={facultyFormHandler} autoComplete="off">
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
                  {isLogging?<i class="fas fa-spinner fa-spin mx-3"></i> :<><i class="fas fa-sign-in-alt mr-1"></i> Login</>}
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
            <h3 className=" jumbotron text-secondary py-3">
             <div className="text-center" >
             <img src="https://i.ibb.co/2N30xt6/400-4003680-registration-for-under-graduate-student-icon-png-min.png" className="" height="100px" width="100px" />
             </div >
             <div className="text-center" >
             <h2 className="text-dark my-1">Student Login</h2>
              <p className="my-1" >
                <small>
                  Please login using your registration number and password...
                </small>
              </p>
             </div>
            </h3>
            <Form noValidate onSubmit={studentFormHandler} autoComplete="off">
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
                  
                {isLogging?<i class="fas fa-spinner fa-spin mx-3"></i> :<><i class="fas fa-sign-in-alt mr-1"></i> Login</>}
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
