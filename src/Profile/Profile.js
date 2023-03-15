import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import "../styles/Register.css";
import { NavLink } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { format } from "date-fns";



const Profile = () => {
  const [user, setUser] = useState(null);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phone, setPhone] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  
  const NavBarUser = (
    <div className="container-xxl position-relative p-0">
      <nav
        id="navbar"
        className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0"
      >
        <div className="navbar-brand">
          <img src="img/logo.png" alt="logo" className="navbar-logo" />
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="fa fa-bars"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto py-0">
            <NavLink to="/home" className="nav-item nav-link active">
              Home
            </NavLink>
            <a href="" className="nav-item nav-link">
              About
            </a>
            <a href="" className="nav-item nav-link">
              Events
            </a>
            <a href="" className="nav-item nav-link">
              Clubs
            </a>
            <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
               <img src={`img/${profilePic}`} alt="Image" height="35" width="35" style={{  borderRadius: '50%',border: '2px solid #ccc',boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.2)',padding: '2px' }} /> {fname} {lname}  
  
              </a>
              <div className="dropdown-menu m-0">
                <a href="" className="dropdown-item">
                  Edit Profile
                </a>
                <NavLink to="/User" className="dropdown-item">
                  Logout
                </NavLink>
                <a href="" className="dropdown-item">
                  About
                </a>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="btn text-secondary ms-3"
            data-bs-toggle="modal"
            data-bs-target="#searchModal"
          >
            <i className="fa fa-search"></i>
          </button>
          <NavLink
            to="/User"
            className="btn btn-secondary text-light rounded-pill py-2 px-4 ms-3"
          >
            Logout
          </NavLink>
        </div>
      </nav>
      <div className="container-xxl py-5 bg-primary hero-header mb-5">
        <div className="container my-5 py-5 px-lg-5">
          <div className="row g-5 py-5">
            <div className="col-lg-6 text-center text-lg-start">
              {/* <h1 className="text-white mb-4 animated zoomIn">
                All in one SEO tool need to grow your business rapidly
              </h1>
              <p className="text-white pb-3 animated zoomIn">
                Tempor rebum no at dolore lorem clita rebum rebum ipsum rebum
                stet dolor sed justo kasd. Ut dolor sed magna dolor sea diam.
                Sit diam sit justo amet ipsum vero ipsum clita lorem
              </p> */}
            </div>
            <div className="col-lg-6 text-center text-lg-start">
              <img className="img-fluid" src="" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="searchModal" tabIndex="-1">
        <div className="modal-dialog modal-fullscreen">
          <div
            className="modal-content"
            style={{ backgroundColor: "rgba(29, 29, 39, 0.7)" }}
          >
            <div className="modal-header border-0">
              <button
                type="button"
                className="btn bg-white btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body d-flex align-items-center justify-content-center">
              <div className="input-group" style={{ maxWidth: "600px" }}>
                <input
                  type="text"
                  className="form-control bg-transparent border-light p-3"
                  placeholder="Type search keyword"
                />
                <button className="btn btn-light px-4">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt_decode(token);
        console.log(decoded);
        const userId = decoded.userId;
        console.log(userId);
        fetch(`http://localhost:3001/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((response) => response.json())
          .then((data) => {
            setUser(data);
          })
          .catch((error) => console.error(error));
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      setFname(user.fname);
      setLname(user.lname);
      setPhone(user.phone);
      setBirthdate(format(new Date(user.birthdate), "yyyy-MM-dd"));
      setProfilePic(user.profilePic);
    }
  }, [user]);


  const UpdateUser = async (event) => {
    event.preventDefault();
    const Nameregex = /^[A-Z][a-z]*$/;
    if (fname === "" || lname === "" || birthdate === "" || phone === "") {
      toast.error("Please fill all required fields");
      return;
    }
    if (!lname.match(Nameregex) || !fname.match(Nameregex)) {
      toast.error(
        "lname or fname must start with a capital letter and should only contain letters"
      );
      return;
    }
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt_decode(token);
        const userId = decoded.userId;
        await fetch(`http://localhost:3001/users/update/${userId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fname,
            lname,
            phone,
            birthdate,
          }),
        });
        toast("User successfully updated !", {
          icon: "👏",
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleChange = async (event) => {
    event.preventDefault();
    const Id = localStorage.getItem("Id");
    console.log(Id);
    console.log(oldPassword);
    await fetch(`http://localhost:3001/users/${Id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oldPassword, newPassword }),
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Password updated successfully");
          response.json();
        } else {
          toast.error("Error");
        }
      })
      .catch((error) => console.error(error));
  };


  return (
    <div>
      {user ? (
        <div>
          {NavBarUser}
          <div className="Container">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="title">Profile</div>
            <h2 className="detail">You can update the details</h2>
            <div className="user-details">
              <div className="input-box">
                <label>First Name</label>
                <input
                  type="text"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                />
              </div>
              <div className="input-box">
                <label>Last Name</label>
                <input
                  type="text"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                />
              </div>
              <div className="input-box">
                <label>Phone</label>
                <input
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="input-box">
                <label>Birthdate</label>
                <input
                  type="date"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                />
                
              </div>
            </div>
            <br />
            <button className="btn btn-info" onClick={UpdateUser}>
              Edit Profile 
            </button>
            <div className="Container">
              <Toaster position="top-center" reverseOrder={false} />
              <div className="title">Reset Password</div>
              <br />
              <form onSubmit={handleChange}>
                <div className="user-details">
                  <div className="input-box">
                    <label className="details">Old Password</label>
                    <input
                      value={oldPassword}
                      placeholder="*************"
                      type="password"
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </div>

                  <div className="input-box">
                    <label className="details">New Password</label>
                    <input
                      value={newPassword}
                      placeholder="************"
                      type="password"
                      onChange={(e) => setnewPassword(e.target.value)}
                    />
                  </div>
                </div>
                <button className="btn btn-warning">Change Password</button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <p className="Loading">
          dear client you should sign in again next time
        </p>
      )}
    </div>
  );
};

export default Profile;
