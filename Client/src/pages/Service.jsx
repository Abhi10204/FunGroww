import React from "react";
import "./Service.css";

const servicesData = [
  {
    icon: "🌐", // Replace with actual icons (e.g., SVGs or Font Awesome classes)
    title: "Web Development",
    description:
      "Custom websites tailored to your needs, from simple landing pages to complex web applications.",
  },
  {
    icon: "📱",
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile apps for iOS and Android devices.",
  },
  {
    icon: "🔗",
    title: "API Integration",
    description:
      "Seamless integration of third-party APIs and development of custom APIs for your business needs.",
  },
  {
    icon: "💻",
    title: "Desktop Applications",
    description:
      "Powerful desktop applications for Windows, macOS, and Linux platforms.",
  },
  {
    icon: "🎨",
    title: "UI/UX Design",
    description:
      "User-centric design solutions that enhance user experience and drive engagement.",
  },
  {
    icon: "✔️",
    title: "Quality Assurance",
    description:
      "Comprehensive testing and quality assurance services to ensure your software is bug-free and reliable.",
  },
];

export const Service = () => {
  return (
    <section className="services">
      <h1 className="services-heading">Here You Get </h1>
      <div className="services-grid">
        {servicesData.map((service, index) => (
          <div key={index} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Service;
