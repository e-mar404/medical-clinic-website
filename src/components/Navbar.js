import React from 'react';
import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import './Navbar.css';

function Navbar() {
  const RenderButtons = () => {
    if (localStorage.getItem("LoggedIn") == "true") {
      return (
        <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link btn btn-lg" aria-current="page" href="/" onClick={SignOut}>Sign Out</a>
          </li>
        </ul>
      )
    }
    else {
      return (
        <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle btn btn-lg" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Employees
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a className="dropdown-item" href="/employee/login">Employee Login</a></li>
            </ul>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle btn btn-lg" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Patients
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a className="dropdown-item" href="/patient/login">Patient Login</a></li>
              <li><a className="dropdown-item" href="/patient/signup">Patient Register</a></li>
            </ul>
          </li>
        </ul>
      )
    }
  }

  const SignOut = () => {
    localStorage.setItem("LoggedIn", false);
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-info">
        <div id="navbarContainer" className="container-fluid">
          <a className="navbar-brand" href="#">Medical Clinic Application</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
            </ul>
            {RenderButtons()}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
