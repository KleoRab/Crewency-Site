import React from "react";
import { Link } from "react-router-dom";
import "./CareersPreview.css";

function CareersPreview() {
  return (
    <section className="careers-preview">
      <div className="careers-content">
        <div className="careers-text">
          <h2>We Are Growing — Join the Crew</h2>
          <p>
            Crewency is always on the lookout for motivated individuals who want to 
            be part of something meaningful. Explore our career opportunities and 
            find your place in our crew.
          </p>
          <Link to="/careers" className="explore-button">Explore Careers</Link>
        </div>
        <div className="careers-image">
          <img src="/careers-preview.jpg" alt="Join the Crewency Team" />
        </div>
      </div>
    </section>
  );
}

export default CareersPreview;
