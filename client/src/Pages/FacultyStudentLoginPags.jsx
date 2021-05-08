import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { facultyLogin } from "../redux/action/facultyAction";
import { studentLogin } from "../redux/action/studentAction";
import classnames from "classnames";

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

  const [showFacultyLogin, setShowFacultyLogin] =  useState(false)

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
    let registrationNumber;
    let password;
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
    <div className="container-fluid">
      <div className="row" id="trail" style={{height:"100vh"}} >
       {showFacultyLogin? 
                  <div
              className="col-md-4 m-auto border shadow"
              style={{
                backgroundColor: "white",
                borderRadius: "1.2rem",
                padding: "1rem 1rem 0rem 1rem",
              }}
            >
              <div>
                <h3 className="text-center "><i class="fas fa-user"></i> FACULTY</h3>
                <form noValidate onSubmit={facultyFormHandler}>
                  <div className="form-group">
                    <label htmlFor="facRegId">Registration Number</label>
                    <input
                      onChange={(e) => setFacultyRegNum(e.target.value)}
                      type="text"
                      value={facultyRegNum}
                      className={classnames("form-control", {
                        "is-invalid": errors.registrationNumber,
                      })}
                      id="facRegId"
                    />
                    {errors.registrationNumber && (
                      <div className="invalid-feedback">
                        {errors.registrationNumber}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="passwordFacId">Password</label>
                    <input
                      onChange={(e) => setFacultyPassword(e.target.value)}
                      value={facultyPassword}
                      className={classnames("form-control", {
                        "is-invalid": errors.password,
                      })}
                      type="password"
                      id="passwordFacId"
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                  <div class="row justify-content-center">
                    <div class="col-md-1">
                      {isFacultyLoading && (
                        <div class="spinner-border text-primary" role="status">
                          <span class="sr-only">Loading...</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {!isFacultyLoading && (
                    <button type="submit" className="btn btn-info btn-block">
                      <i class="fas fa-sign-in-alt"></i> Login
                    </button>
                  )}
                </form>
              
                <div className="bg-success text-white py-2 text-center my-2 cp rounded-pill" onClick={()=> setShowFacultyLogin(false)} >Go to faculty login</div>
  
              </div>
            </div>:
         <div
         className="col-md-4 m-auto border shadow"
         style={{
           backgroundColor: "white",
           borderRadius: "1.2rem",
           padding: "1rem 1rem 0rem 1rem",
         }}
       >
         <div>
           <h3 className="text-center"><i class="fas fa-user"></i> Hello Pika Pika</h3>
           <form noValidate onSubmit={studentFormHandler}>
             <div className="form-group">
               <label htmlFor="studentId">Registration Number</label>
               <input
               placeholder="Enter your registraion number"
                 onChange={(e) => setStudentRegNum(e.target.value)}
                 type="text"
                 value={studentRegNum}
                 className={classnames("form-control", {
                   "is-invalid": errorsHelper.registrationNumber,
                 })}
                 id="studentId"
               />
               {errorsHelper.registrationNumber && (
                 <div className="invalid-feedback">
                   {errorsHelper.registrationNumber}
                 </div>
               )}
             </div>
             <div className="form-group">
               <label htmlFor="passwordId">Password</label>
               <input
                placeholder="Enter your password"
                 onChange={(e) => setStudentPassword(e.target.value)}
                 value={studentPassword}
                 className={classnames("form-control", {
                   "is-invalid": errorsHelper.password,
                 })}
                 type="password"
                 id="passwordId"
               />
               {errorsHelper.password && (
                 <div className="invalid-feedback">
                   {errorsHelper.password}
                 </div>
               )}
             </div>
             <div class="row justify-content-center">
               <div class="col-md-1">
                 {isStudentLoading && (
                   <div class="spinner-border text-primary" role="status">
                     <span class="sr-only">Loading...</span>
                   </div>
                 )}
               </div>
             </div>
             {!isStudentLoading && (
               <button type="submit" className="btn btn-info btn-block ">
                 <i class="fas fa-sign-in-alt"></i> Login
               </button>
             )}
           </form>
           
           <div className="bg-primary py-2 text-center my-2  cp rounded-pill text-white" onClick={()=> setShowFacultyLogin(true)} >Go to faculty login</div>
         </div>
       </div>

 } 
      
      </div>
    </div>
  );
};

export default FacultyStudentLoginPags;
