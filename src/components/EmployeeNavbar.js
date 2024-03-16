import React from 'react';
import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import './PatientNavbarStyles.css';

function EmployeeNavbar() {
  return (
    <>
      <nav className='nav'>
        <FaBars className='bars' />
        
        <div className='nav-menu'>
          <Link className='nav-link' to='/employee' activeSyle>Dashboard</Link>
        </div>

        <nav className='nav-btn'>
          <Link className='nav-btn-link' to='/employee/login'>Log In</Link>
        </nav>
      </nav>
    </>
  );
}

export default EmployeeNavbar;
