import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import FacultyHomeHelper from "../Components/FacultyHomeHelper";
import Barcode from "react-barcode";

const FacultyInterface = () => {
  const history = useHistory();
  const store = useSelector((store) => store);
  return (
    <>
      {store.faculty.isAuthenticated ? (
        <>
          <FacultyHomeHelper />
          <div className="container">
            <div className="row mt-5">
              <div className="col-md-2"></div>
              <div className="col-md-8">
                <div className="row">
                  <div className="col-md-5 p-2 ">
                    <div
                      className="card bg-white mx-auto"
                      style={{ maxWidth: "300px" }}
                    >
                      <div className="bg-green rounded-top p-2 text-center font-weight-bold text-white">
                        Faculty
                      </div>
                      <div className="bg-info text-center admin-card">
                        <img
                          className="  bg-white border rounded-circle my-3"
                          style={{
                            height: "150px",
                            width: "150px",
                            objectFit: "contain",
                          }}
                          src={store.faculty.faculty.faculty.avatar}
                          alt="Card image cap"
                        />
                      </div>
                      <div className="bg-info text-left">
                        <div className="admin-card-bottom bg-white py-3 px-3">
                          <table className="table table-borderless mb-0">
                            <tbody>
                              <tr>
                                <td>
                                  <div
                                    className="rounded-circle border bg-green text-blue text-center p-2 font-18"
                                    style={{ height: "40px", width: "40px" }}
                                  >
                                    <i class="fas fa-user"></i>
                                  </div>
                                </td>
                                <td className="lead pt-3">
                                  {store.faculty.faculty.faculty.name}
                                </td>
                              </tr>
                              <tr>
                                <th className="text-center">ID:</th>
                                <td>
                                  {
                                    store.faculty.faculty.faculty
                                      .registrationNumber
                                  }
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <div className="text-center">
                            <Barcode
                              value={
                                store.faculty.faculty.faculty.registrationNumber
                              }
                              height="25"
                              width="1"
                            />
                          </div>
                        </div>
                        {/* <Link to='/faculty/updateProfile'>UPDATE PROFILE</Link> */}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-7 bg-dark  text-white">
                    <table className="table ">
                      <tbody className="text-white">
                        <tr>
                          <td>Name</td>
                          <td>{store.faculty.faculty.faculty.name}</td>
                        </tr>
                        <tr>
                          <td>Email</td>
                          <td>{store.faculty.faculty.faculty.email}</td>
                        </tr>
                        <tr>
                          <td>Registration Number</td>
                          <td>
                            {store.faculty.faculty.faculty.registrationNumber}
                          </td>
                        </tr>
                        <tr>
                          <td>Date Of Birth</td>
                          <td>{store.faculty.faculty.faculty.dob}</td>
                        </tr>
                        <tr>
                          <td>Designation</td>
                          <td>{store.faculty.faculty.faculty.designation}</td>
                        </tr>
                        <tr>
                          <td>Joining Year</td>
                          <td>{store.faculty.faculty.faculty.joiningYear}</td>
                        </tr>
                        <tr>
                          <td>Department</td>
                          <td>{store.faculty.faculty.faculty.department}</td>
                        </tr>
                        <tr>
                          <td>Gender</td>
                          <td>
                            {store.faculty.faculty.faculty.gender
                              ? store.faculty.faculty.faculty.gender
                              : "NA"}
                          </td>
                        </tr>
                        <tr>
                          <td>Contact Number</td>
                          <td>
                            {store.faculty.faculty.faculty.facultyMobileNumber
                              ? store.faculty.faculty.faculty
                                  .facultyMobileNumber
                              : "NA"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-md-2"></div>
            </div>
          </div>
        </>
      ) : (
        history.push("/")
      )}
    </>
  );
};

export default FacultyInterface;
