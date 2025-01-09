import React from "react";
import "./Home.css"; // Import the CSS file for Home
import { NavLink } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <header className="home-header">
        <div className="container header-section flex">
          <div className="header-left">
            <h1>Got Talent? Meet Opportunity</h1>
            <p className="tag-line">
              Unlock the power of your ideas with skilled freelancers ready to bring your vision to life. 
            </p>
            {/* Use NavLink to navigate to the "Post a Job" page */}
            <NavLink to="/register" className="primary-button">
              Get Started
            </NavLink>
          </div>
          <div className="header-right">
            <img src="/images/laptopBoy.png" alt="Boy with a laptop" />
          </div>
        </div>
      </header>
    </>
  );
};
