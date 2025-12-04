import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroCarousel.css';

function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Images stored in public/images/
  const slides = [
    { id: 1, image: '/images/buk1.jpg', title: 'BUK Campus', description: 'Beautiful campus of Bayero University Kano' },
    { id: 2, image: '/images/buk2.jpg', title: 'BUK Building', description: 'Another view of BUK campus' },
    { id: 3, image: '/images/buk4.jpg', title: 'BUK Campus View', description: 'Scenic view of Bayero University Kano' },
    { id: 4, image: '/images/bukSenate.jpg', title: 'BUK Architecture', description: 'Modern architecture of BUK' },
    { id: 5, image: '/images/buk3.jpg', title: 'BUK Architecture', description: 'Modern architecture of BUK' },
    { id: 6, image: '/images/buklibrary.jpg', title: 'BUK Environment', description: 'Academic environment of BUK' },
  ];

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 12000); // every 12 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => setCurrentSlide(index);
  const goToPrevious = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToNext = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  return (
    <div className="hero-carousel">
      <div className="carousel-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      <button className="carousel-arrow carousel-arrow-left" onClick={goToPrevious}>‹</button>
      <button className="carousel-arrow carousel-arrow-right" onClick={goToNext}>›</button>

      {/* Dots indicator */}
      <div className="carousel-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Overlay content */}
      <div className="carousel-overlay">
        <div className="buk-logo-section">
          <h1>Bayero University Kano</h1>
          <p className="buk-motto">TO LEAD IN RESEARCH AND EDUCATION IN AFRICA</p>
        </div>
        <p className="hero-subtitle">
          ...your secure verification of academic qualifications issued by Bayero University, Kano!
        </p>
        <div className="hero-buttons">
          <button className="primary-btn" onClick={() => navigate('/verifier/login')}>
            Verify a Certificate
          </button>
          <button className="secondary-btn" onClick={() => navigate('/verifier/login')}>
            Register as Verifier
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroCarousel;
