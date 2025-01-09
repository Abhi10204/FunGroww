import React from "react";
import "./About.css";

export const About = () => {
  return (
    <div className="container">
      <main className="about-section">
        <h3>About Us - Fungroww</h3>
        <div className="content-flex">
          {/* Right Text Section */}
          <div className="content-right">
            <p>
              Welcome to Fungroww! Our mission is to empower freelancers and
              professionals with the skills they need to grow and succeed.
              Whether you're starting your freelancing journey or honing your
              expertise, we provide resources, courses, and insights to help you
              thrive in the digital world. We aim to change the industry rapidly
              and create opportunities for young talents.
            </p>
            <p>
              At Fungroww, we believe in continuous learning and
              community-driven growth. Join us to unlock your potential and
              explore limitless possibilities!
            </p>
          </div>

          {/* Left Image Section */}
          <div className="content-left">
            <img src="/images/about.png" alt="About Fungroww" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
