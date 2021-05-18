import React,{useEffect} from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import AdminHomeHelper from "../../Components/AdminHomeHelper";

var Barcode = require('react-barcode');

const AdminHome = () => {
  const store = useSelector((store) => store);

	
  useEffect(() => {
    if (!store.admin.isAuthenticated) {
      history.push("/adminLogin");
    }
  }, [store.admin.isAuthenticated]);

  const history = useHistory();
  return (
    <div
      style={{
        backgroundImage:
          "url(https://cdn.msisurfaces.com/images/colornames/gradient/absolute-black-granite.jpg)",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      {store.admin.isAuthenticated ? (
        <>
          <AdminHomeHelper />
          <div className="container">
            <div className="row  mt-4 bg-light p-4 shadow-lg rounded-lg ">
              <div className="col-md-5 p-2 ">
                <div className="card bg-white mx-auto" style={{maxWidth:"300px"}} >
                  <div className="bg-green rounded-top p-2 text-center font-weight-bold text-white">
                    Admin
                  </div>
                  <div className="bg-info text-center admin-card">
                    <img
                      className="  bg-white border rounded-circle my-3"
                      style={{
                        height: "150px",
                        width: "150px",
                        objectFit: "contain",
                      }}
                      src={store.admin.admin.avatar}
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
                              {store.admin.admin.name}
                            </td>
                          </tr>
                          <tr>
                            <th className="text-center">ID:</th>
                            <td >{store.admin.admin.registrationNumber}</td>
                          </tr>
                        </tbody>
                      </table>
											<div className="text-center"><Barcode value={store.admin.admin.registrationNumber } height="25" width="1" /></div>
                    </div>
                    {/* <Link to='/faculty/updateProfile'>UPDATE PROFILE</Link> */}
                  </div>
                </div>
              </div>
              <div className="col-md-7  ">
							<div className="p-2 rounded-top bg-info text-white text-center w-100 lead font-weight-bold">Admin details</div>
                <table className="table border table-striped">
									
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <td>{store.admin.admin.name}</td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td>{store.admin.admin.email}</td>
                    </tr>
                    <tr>
                      <th>Registration Number</th>
                      <td>{store.admin.admin.registrationNumber}</td>
                    </tr>
                    <tr>
                      <th>Joining Year</th>
                      <td>{store.admin.admin.joiningYear}</td>
                    </tr>
                    <tr>
                      <th>Department</th>
                      <td>{store.admin.admin.department}</td>
                    </tr>
                    <tr>
                      <th>Contact Number</th>
                      <td>
                        {store.admin.admin.contactNumber
                          ? store.admin.admin.contactNumber
                          : "NA"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : (
        history.push("/")
      )}
    </div>
  );
};

export default AdminHome;
