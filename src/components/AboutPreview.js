import React from "react";
import { Link } from "react-router-dom";
import "./AboutPreview.css";

function AboutPreview() {
  return (
    <section className="about-preview">
      <div className="about-preview-content">
        <div className="about-text">
          <h2>More Than 5 Years of Experience</h2>
          <p>
            Crewency has been matching great companies with outstanding IT talent. 
            Our team of experienced professionals helps bridge the gap between growing 
            tech needs and reliable people.
          </p>
          <Link to="/about" className="explore-button">Explore</Link>
        </div>
        <div className="about-image">
          <img src="/about-preview.jpg" alt="About Crewency" />
        </div>
      </div>
    </section>
  );
}

export default AboutPreview;
