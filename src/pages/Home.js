import React from "react";
import HeroSlider from "../components/HeroSlider";
import ServicesPreview from "../components/ServicesPreview";
import AboutPreview from "../components/AboutPreview";
import CareersPreview from "../components/CareersPreview";
import ContactPreview from "../components/ContactPreview";

function Home() {
  return (
    <main>
      <HeroSlider />
      <ServicesPreview />
      <AboutPreview />
      <CareersPreview />
      <ContactPreview />
    </main>
  );
}

export default Home;
