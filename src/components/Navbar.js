import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

function Username() {
  return (
    <a className="nav-link dropdown-toggle btn btn-lg" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      <span id="navFirstName">{localStorage.getItem("UserFirstName")}</span> <span id="navLastName">{localStorage.getItem("UserLastName")}</span>
    </a>
  )
}

function SignOutButton() {
  let nav = useNavigate();
  return (
    <li className="nav-item">
      <a className="nav-link btn btn-lg" aria-current="page" href="/" onClick={function () {
        localStorage.clear();
        nav('/', {});
      }}>Sign Out</a>
    </li>
  )
}

function Navbar() {
  const RenderLeftSide = () => {
    if (localStorage.getItem("UserType") === 'Patient') {
      return (
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link" aria-current="page" href="/">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="/">Appointments</a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="/">Locations</a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle disabled" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Services
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a className="dropdown-item" href="/">Cancer</a></li>
              <li><a className="dropdown-item" href="/">Children's Services</a></li>
              <li><a className="dropdown-item" href="/">Heart & Vascular</a></li>
              <li><a className="dropdown-item" href="/">Neuroscience</a></li>
              <li><a className="dropdown-item" href="/">Surgical Services</a></li>
              <li><a className="dropdown-item" href="/">Transplant</a></li>
            </ul>
          </li>
        </ul>
      )
    }
    else if (localStorage.getItem("UserType") === 'Doctor' || localStorage.getItem("UserType") === 'Nurse') {
      return (
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link" aria-current="page" href="/employee">Employee Home</a>
          </li>
        </ul>
      )
    }
    else if (localStorage.getItem("UserType") === 'Administrator') {
      return (
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link" aria-current="page" href="/admin">Admin Home</a>
          </li>
        </ul>
      )
    }
    else {
      return (
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link" aria-current="page" href="/">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="/">Appointments</a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="/">Locations</a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle disabled" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Services
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a className="dropdown-item" href="/">Cancer</a></li>
              <li><a className="dropdown-item" href="/">Children's Services</a></li>
              <li><a className="dropdown-item" href="/">Heart & Vascular</a></li>
              <li><a className="dropdown-item" href="/">Neuroscience</a></li>
              <li><a className="dropdown-item" href="/">Surgical Services</a></li>
              <li><a className="dropdown-item" href="/">Transplant</a></li>
            </ul>
          </li>
        </ul>
      )

    }
  }
  const RenderRightSide = () => {
    if (localStorage.getItem("LoggedIn") === "true" && localStorage.getItem("UserType") === 'Patient') {
      return (
        <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
          <li className="nav-item dropdown">
            {Username()}
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a className="dropdown-item" href="/employee/login">Profile Information</a></li>
              <li><a className="dropdown-item" href="/employee/login">Medical History</a></li>
              <div className="dropdown-divider"></div>
              <li><a className="dropdown-item" href="/employee/login">Schedule Appointment</a></li>
            </ul>
          </li>
          {SignOutButton()}
        </ul>
      )
    }
    else if (localStorage.getItem("LoggedIn") === "true" && localStorage.getItem("UserType") === 'Doctor') {
      return (
        <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
          <li className="nav-item dropdown">
            {Username()}
          </li>
          {SignOutButton()}
        </ul>
      )
    }
    else { // Not signed in (default)
      return (
        <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle btn btn-lg" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Employees
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a className="dropdown-item" href="/employee/login">Employee Login</a></li>
            </ul>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle btn btn-lg" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
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
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-info">
        <div id="navbarContainer" className="container-fluid">
          <a className="navbar-brand" href="/">Medical Clinic Application</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {RenderLeftSide()}
            {RenderRightSide()}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
