import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Register.css";
import User from "./User";

const Users = () => {
  const [data, setData] = useState([]);
  const [utilisateur,setUtilisateur]=useState([]);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");


  


  const fetchData = async () => {
    const response = await fetch(`http://localhost:3001/users`);
    const data = await response.json();
    setData(data.filter((user) => !user.isAdmin));
  };


  


  useEffect(() => {
    const Id = localStorage.getItem("Id");
    fetch(`http://localhost:3001/users/${Id}`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setUtilisateur(data);
      });
    fetchData();
  }, []);


  useEffect(() => {
    if (utilisateur) {
      setFname(utilisateur.fname);
      setLname(utilisateur.lname);
    }
  }, [utilisateur]);


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
                {fname} {lname}
              </a>
              <div className="dropdown-menu m-0">
                <a href="" className="dropdown-item">
                  Manage Users
                </a>
                <a href="" className="dropdown-item">
                  Logout
                </a>
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
            to="/Admin"
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

  return (
    <div>
      {NavBarUser}
      { localStorage.getItem("Id") ? data.map((user, index) => (
        <User
        id={user._id}
          key={index}
          fname={user.fname}
          lname={user.lname}
          email={user.email}
          phone={user.phone}
          birthdate={user.birthdate}
        />
      )): (<div className="Loading">dear client you should sign in again next time</div>) }
    </div>
  );
};

export default Users;
