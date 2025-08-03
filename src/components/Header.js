import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { FaSearch, FaInstagram, FaLinkedinIn, FaFacebookF } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          <Link to="/">
            <img src="/crewency-logo.png" alt="Crewency Logo" className="logo" />
          </Link>
        </div>
        <nav className="nav-menu">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/about">About</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <div className="icon-section">
          <FaSearch className="icon" />
          <FaInstagram className="icon" />
          <FaLinkedinIn className="icon" />
          <FaFacebookF className="icon" />
        </div>
      </div>
    </header>
  );
};

export default Header;
