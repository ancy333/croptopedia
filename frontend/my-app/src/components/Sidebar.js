// src/components/Sidebar.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaChartLine, FaTable, FaInfoCircle } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">

      </div>
      <ul className="nav-items">
        <li>
          <NavLink to="/" className="nav-link" activeClassName="active-link">
            <FaHome className="nav-icon" /> Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/recommendations" className="nav-link" activeClassName="active-link">
            <FaChartLine className="nav-icon" /> Recommendations
          </NavLink>
        </li>
        <li>
          <NavLink to="/dataanalysis" className="nav-link" activeClassName="active-link">
            <FaTable className="nav-icon" /> Data Analysis
          </NavLink>
        </li>
        <li>
          <NavLink to="/chartdiv" className="nav-link" activeClassName="active-link">
            <FaTable className="nav-icon" /> Charts
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className="nav-link" activeClassName="active-link">
            <FaInfoCircle className="nav-icon" /> About
          </NavLink>
        </li>
        
      </ul>
    </div>
  );
};

export default Sidebar;
