import React from 'react';
import { Link } from 'react-router-dom'; 

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Bazar Online</a>
        <div className="collapse navbar-collapse">
          <div className="navbar-nav">
            <Link className="nav-link active" to="/" aria-current="page">Home</Link>
            <Link className="nav-link" to="/sales">Sales</Link> 
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
