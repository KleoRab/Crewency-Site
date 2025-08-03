import React from "react";
import "./ContactPreview.css";

function ContactPreview() {
  return (
    <section className="contact-preview">
      <div className="contact-text">
        <h2>Let us connect with you</h2>
        <p>
          We are always available to assist with your IT needs. Whether you have questions,
          need technical support, or want to explore potential partnerships—our team is here to help.
        </p>
        <a href="/contact" className="cta-button">
          Get In Touch
        </a>
      </div>
      <img src="/icon-email.png" alt="Email Icon" className="contact-icon" />
    </section>
  );
}

export default ContactPreview;
