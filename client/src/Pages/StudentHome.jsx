import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import HomeHelper from "../Components/HomeHelper";
import Barcode from "react-barcode";

const Home = () => {
  const store = useSelector((store) => store);
  const history = useHistory();

  return (
    <div>
      {store.student.isAuthenticated ? (
        <>
          <HomeHelper />
          <div className="container">
            <div className="row">
              <div className="col-md-12 mt-5">
                <div className="row">
                  <div className="col-md-5">
                    <div
                      className="card bg-white mx-auto"
                      style={{ maxWidth: "300px" }}
                    >
                      <div className="bg-green rounded-top p-2 text-center font-weight-bold text-white">
                        Student
                      </div>
                      <div className="bg-info text-center admin-card">
                        <img
                          className="  bg-white border rounded-circle my-3"
                          style={{
                            height: "150px",
                            width: "150px",
                            objectFit: "contain",
                          }}
                          src={store.student.student.student.avatar}
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
                                  {store.student.student.student.name}
                                </td>
                              </tr>
                              <tr>
                                <th className="text-center">ID:</th>
                                <td>
                                  {
                                    store.student.student.student
                                      .registrationNumber
                                  }
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <div className="text-center">
                            <Barcode
                              value={
                                store.student.student.student.registrationNumber
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
                          <td>{store.student.student.student.name}</td>
                        </tr>
                        <tr>
                          <td>Email</td>
                          <td>{store.student.student.student.email}</td>
                        </tr>
                        <tr>
                          <td>Registration Number</td>
                          <td>
                            {store.student.student.student.registrationNumber}
                          </td>
                        </tr>
                        <tr>
                          <td>Date Of Birth</td>
                          <td>{store.student.student.student.dob}</td>
                        </tr>
                        <tr>
                          <td>Year</td>
                          <td>{store.student.student.student.year}</td>
                        </tr>
                        <tr>
                          <td>Department</td>
                          <td>{store.student.student.student.department}</td>
                        </tr>
                        <tr>
                          <td>Section</td>
                          <td>{store.student.student.student.section}</td>
                        </tr>
                        <tr>
                          <td>Batch</td>
                          <td>{store.student.student.student.batch}</td>
                        </tr>
                        <tr>
                          <td>Gender</td>
                          <td>
                            {store.student.student.student.gender
                              ? store.student.student.student.gender
                              : "NA"}
                          </td>
                        </tr>
                        <tr>
                          <td>Contact Number</td>
                          <td>
                            {store.student.student.student.studentMobileNumber
                              ? store.student.student.student
                                  .studentMobileNumber
                              : "NA"}
                          </td>
                        </tr>
                        <tr>
                          <td>Aadhar Card</td>
                          <td>
                            {store.student.student.student.aadharCard
                              ? store.student.student.student.aadharCard
                              : "NA"}{" "}
                          </td>
                        </tr>
                        <tr>
                          <td>Father Name</td>
                          <td>
                            {store.student.student.student.fatherName
                              ? store.student.student.student.fatherName
                              : "NA"}
                          </td>
                        </tr>
                        <tr>
                          <td>Father Contact Number</td>
                          <td>
                            {store.student.student.student.fatherMobileNumber
                              ? store.student.student.student.fatherMobileNumber
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
    </div>
  );
};

export default Home;
