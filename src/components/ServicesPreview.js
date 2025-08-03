// src/components/ServicesPreview.js
import React from "react";
import "./ServicesPreview.css";
import { FaTools, FaHeadset, FaUserCog } from "react-icons/fa";

const services = [
  {
    title: "Technical Support",
    description: "Reliable day-to-day support for your team and systems.",
    icon: <FaTools size={40} color="#00325e" />,
  },
  {
    title: "Help Desk",
    description: "Our responsive IT help desk team keeps your people moving.",
    icon: <FaHeadset size={40} color="#00325e" />,
  },
  {
    title: "Management Services",
    description: "Scale smoothly with experienced team leads and managers.",
    icon: <FaUserCog size={40} color="#00325e" />,
  },
];

function ServicesPreview() {
  return (
    <section className="services-preview">
      <h2>What We Do</h2>
      <div className="service-cards">
        {services.map((service, index) => (
          <div className="card" key={index}>
            {service.icon}
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ServicesPreview;
