import React from 'react';
import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import './PatientNavbarStyles.css';

function PatientNavbar () {
  return (
    <>
      <nav className='nav'>
        <FaBars className='bars' />
        
        <div className='nav-menu'>
          <Link className='nav-link' to='/patient' activeSyle>Home</Link>
        </div>

        <nav className='nav-btn'>
          <Link className='nav-btn-link' to='/patient/login'>Log In</Link>
        </nav>
      </nav>
    </>
  );
}

export default PatientNavbar;
