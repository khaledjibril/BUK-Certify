import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

function About() {
  return (
    <div className="about-page">
      <Navbar />
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1>About Bayero University Kano</h1>
          <p className="about-subtitle">TO LEAD IN RESEARCH AND EDUCATION IN AFRICA</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="about-main">
        <div className="container">
          <div className="about-content-grid">
            <div className="about-text-section">
              <h2>Our History</h2>
              <p>Bayero University Kano (BUK) has evolved from a small college running Advanced Level training programmes to one of the respected Nigerian Universities, recognized beyond the shores of the country.</p>
              <p>The seed of Bayero University Kano was the Ahmadu Bello College set up in 1960, located within the School for Arabic Studies (SAS), in the old city of Kano. With the establishment of Ahmadu Bello University, Zaria, in 1962, it was renamed Abdullahi Bayero College.</p>
              <p>In 1964 it moved to a temporary site at the old Kano Airport Hotel, admitting its first set of ten undergraduate students for a B.A. degree programme of Ahmadu Bello University.</p>
              <p>
                    Today, Bayero University Kano stands as one of the largest and most respected universities in Nigeria,
                    offering a wide range of undergraduate and postgraduate programs across various disciplines. The university
                    is committed to academic excellence, research innovation, and community development.
             </p>
            </div>

            <div className="about-image-section">
              <img src="/images/bukSenate.jpg" alt="Bayero University Kano Senate Building" />
            </div>
          </div>

          <div className="about-mission">
            <h2>Our Mission</h2>
            <p>Bayero University Kano is committed to providing quality education that fosters critical thinking, leadership skills, and prepares students to contribute meaningfully to society while maintaining the highest standards of academic integrity and excellence.</p>
          </div>

          <div className="about-stats">
            <h2>University Statistics</h2>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">5</div>
                <div className="stat-label">Campuses</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">15</div>
                <div className="stat-label">Faculties</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">200+</div>
                <div className="stat-label">Programmes</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">30,000+</div>
                <div className="stat-label">Students</div>
              </div>
            </div>
          </div>

          <div className="about-verification">
            <h2>Certificate Verification System</h2>
            <p>The BUK Certificate Verification System is a secure platform designed to help employers, institutions, and graduates verify the authenticity of academic qualifications issued by Bayero University Kano.</p>
            <div className="verification-features">
              <div className="feature">
                <h3>Secure Verification</h3>
                <p>Advanced security measures ensure tamper-proof verification of all certificates.</p>
              </div>
              <div className="feature">
                <h3>Instant Results</h3>
                <p>Get immediate verification results with detailed certificate information.</p>
              </div>
              <div className="feature">
                <h3>Global Access</h3>
                <p>Accessible worldwide for employers and institutions to verify BUK qualifications.</p>
              </div>
            </div>
          </div>

          <div className="about-contact">
            <h2>Contact Information</h2>
            <div className="contact-grid">
              <div className="contact-item">
                <strong>Main Campus</strong>
                <p>PMB 3011, Gwarzo Road, Kano, Nigeria</p>
              </div>
              <div className="contact-item">
                <strong>Phone</strong>
                <p>(+234) 816-0107510</p>
              </div>
              <div className="contact-item">
                <strong>Email</strong>
                <p>info@buk.edu.ng</p>
              </div>
              <div className="contact-item">
                <strong>Registry</strong>
                <p>registry@buk.edu.ng</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default About; 