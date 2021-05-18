import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { adminLogin } from "../redux/action/adminAction";
import classnames from "classnames";
import Logo from "../Style/Images/Logo.png"

const LoginPage = () => {
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  useEffect(() => {
    if (store.admin.isAuthenticated) {
      history.push("/admin");
    }
  }, [store.admin.isAuthenticated]);
  useEffect(() => {
    if (store.error) {
      setError(store.error);
    }
  }, [store.error]);

  const fromHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(adminLogin({ registrationNumber, password }));
  };

  useEffect(() => {
    if (store.error || store.admin.isAuthenticated) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [store.error, store.admin.isAuthenticated]);

  return (
    <div className="admin-login-background" >
			<span
        style={{
          position: "absolute",
          top: "5px",
          left: "15px",
        }}
      >
        <img src={Logo} alt="Logo" height="35px" />
      </span>
      <div className="row justify-content-center">
        <div className="col-md-5 ">
          <div className="d-flex justify-content-md-center align-items-center vh-100 ">
            <div className="  text-white mx-5" style={{
							width:'100%'
						}}  >
              <div className="font-22 text-right">ADMIN LOGIN</div>
							<hr  className="rounded-pill mb-2" style={{height:"1px", backgroundColor:"#fff"}} />
							<hr  className="rounded-pill mt-0 pt-0" style={{height:"4px", backgroundColor:"#fff"}} />
            
						  <form  className="p-2 my-4" noValidate onSubmit={fromHandler}>
                <div className="form-group">
                  <label htmlFor="emailId">Registration Number</label>
                  <input
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    type="text"
										autoFocus
                    autoComplete="off"
										placeholder="Enter registration number..."
                    value={registrationNumber}
                    className={classnames("form-control", {
                      "is-invalid": error.registrationNumber,
                    })}
                    id="emailId"
                  />
                  {error.registrationNumber && (
                    <div className="invalid-feedback">
                      {error.registrationNumber}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="passwordId">Password</label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
										placeholder="Enter your password..."
                    value={password}
                    className={classnames("form-control ", {
                      "is-invalid": error.password,
                    })}
                    value={password}
                    type="password"
                    id="passwordId"
                  />
                  {error.password && (
                    <div className="invalid-feedback">{error.password}</div>
                  )}
                </div>
                <div class="row justify-content-center">
                  <div class="col-md-1">
                    {isLoading && (
                      <div class="spinner-border text-primary" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    )}
                  </div>
                </div>
                {!isLoading && (
                  <button type="submit" className="btn btn-light rounded-0 ">
                    Login
                  </button>
                )}
              </form>
							<hr  className="rounded-pill mb-2" style={{height:"1px", backgroundColor:"#fff"}} />
							<hr  className="rounded-pill mt-0 pt-0" style={{height:"4px", backgroundColor:"#fff"}} />
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
