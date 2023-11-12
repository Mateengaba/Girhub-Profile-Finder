import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import logo from "../assets/logo.png";
import './Navbar.css';

const Navbar = () => {
  return (
    <>
      <nav>
        <li>
          <Link to="/" className='title'><img src={logo} alt="" /></Link>
        </li>
        <ul>
          <li>
            <Link to="/">Home</Link> {/* Use Link for navigation */}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
