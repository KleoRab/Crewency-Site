import React, { useEffect, useState } from "react";
import "./HeroSlider.css";

const images = [
  "/hero-slide-1.jpg",
  "/hero-slide-2.jpg",
  "/hero-slide-3.jpg",
];

function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // auto-slide every 5 seconds
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="hero-slider">
      <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="slide-image" />
      <div className="overlay">
        <h1>Your Crew. Your Confidence.</h1>
        <p>IT staffing with expertise, professionalism, and trust.</p>
      </div>
      <div className="slider-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={index === currentIndex ? "dot active" : "dot"}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSlider;
