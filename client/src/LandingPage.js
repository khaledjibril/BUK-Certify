import React from 'react';
import HeroCarousel from './HeroCarousel';

function LandingPage({ setPage }) {
  return (
    <div className="landing-page">
      {/* Hero Section with Carousel */}
      <HeroCarousel setPage={setPage} />

      {/* Student/Graduate Section */}
      <section className="student-section">
        <div className="container">
          <h2>Do you want to verify a Bayero University-issued certificate or qualification?</h2>
          <p>Use this platform to verify the authenticity of certificates and qualifications issued by Bayero University Kano, and obtain a unique verification code for employers and institutions.</p>
          <button className="primary-btn" onClick={() => setPage('verifier')}>Verify a BUK Certificate</button>
        </div>
      </section>

      {/* How it Works */}
      <section className="how-it-works">
        <div className="container">
          <h2>How it Works</h2>
          <div className="steps-grid">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Obtain a Unique Verification Code</h3>
              <p>BUK issues a unique verification code (UVC) for each certificate held on our secure system for graduates from the university.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Register on BUK Platform</h3>
              <p>Users of the verification system need to register to verify candidate certificates. Once registered, a confirmation email will be sent to your registered email address.</p>
              <button className="secondary-btn" onClick={() => setPage('verifier')}>Register Now</button>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Verify Candidate's Qualification</h3>
              <p>Click the link in the email to complete registration. Enter the Unique Verification Code, press Search, and results will be displayed instantly with tamper-proof verification.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About BUK Section */}
      <section className="about-buk">
        <div className="container">
          <h2>About Bayero University Kano</h2>
          <div className="about-content">
            <div className="about-text">
              <h3>"AND ABOVE EVERY POSSESSOR OF KNOWLEDGE, THERE IS THE ONE MORE LEARNED."</h3>
            </div>
            
            <div className="about-image">
              <img src="/images/bukSenate.jpg" alt="Bayero University Kano Senate Building" />
            </div>
            
            <div className="about-text">
              <p>Bayero University has evolved from a small college running Advanced Level training programmes to one of the respected Nigerian Universities, recognized beyond the shores of the country.</p>
              <p>The seed of Bayero University Kano was the Ahmadu Bello College set up in 1960, located within the School for Arabic Studies (SAS), in the old city of Kano. With the establishment of Ahmadu Bello University, Zaria, in 1962, it was renamed Abdullahi Bayero College. In 1964 it moved to a temporary site at the old Kano Airport Hotel, admitting its first set of ten undergraduate students for a B.A. degree programme of Ahmadu Bello University.</p>
              <p>Today, Bayero University Kano stands as one of the largest and most respected universities in Nigeria, offering a wide range of undergraduate and postgraduate programs across various disciplines. The university is committed to academic excellence, research innovation, and community development.</p>
              <p>Our mission is to provide quality education that fosters critical thinking, leadership skills, and prepares students to contribute meaningfully to society while maintaining the highest standards of academic integrity and excellence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* BUK Rankings */}
      <section className="buk-rankings">
        <div className="container">
          <h2>Our Rankings & Achievements</h2>
          <div className="rankings-grid">
            <div className="ranking-item">
              <h3>Clinical Rankings</h3>
              <p>Leading medical and health sciences education in Nigeria</p>
            </div>
            <div className="ranking-item">
              <h3>Physical Sciences</h3>
              <p>Excellence in scientific research and innovation</p>
            </div>
            <div className="ranking-item">
              <h3>National Recognition</h3>
              <p>One of Nigeria's top-ranked universities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="partners-section">
        <div className="container">
          <h2>Partners & Affiliations</h2>
          <div className="partners-grid">
            <div className="partner">FGN</div>
            <div className="partner">MoE</div>
            <div className="partner">NUC</div>
            <div className="partner">NCCE</div>
            <div className="partner">NBTE</div>
            <div className="partner">TETFund</div>
          </div>
        </div>
      </section>

      {/* Why Choose BUK */}
      <section className="why-buk">
        <div className="container">
          <h2>Why Choose BUK Verification?</h2>
          <div className="reasons-grid">
            <div className="reason">
              <h3>Employment Screening</h3>
              <p>According to reports, up to 85% of job applicants' CVs are falsified. Employers can use BUK service to stop this abuse and ensure genuine qualifications.</p>
            </div>
            <div className="reason">
              <h3>Fraud Prevention</h3>
              <p>BUK is working with partner Nigerian universities to securely verify qualifications online with digital signatures and tamper-proof verification.</p>
            </div>
            <div className="reason">
              <h3>Degree Mill Protection</h3>
              <p>Degree mills offer bogus certificates for sale. BUK partner universities provide students with Unique Verification Codes that guarantee authenticity.</p>
            </div>
            <div className="reason">
              <h3>Reputation Management</h3>
              <p>Reputation management is crucial for academic institutions. The BUK system protects university reputation by ensuring only qualifications with corresponding unique codes are legitimate and trusted.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <h2>Contact Information</h2>
          <div className="contact-grid">
            <div className="contact-item">
              <strong>Address:</strong>
              <p>PMB 3011, Gwarzo Road Kano, Nigeria.</p>
            </div>
            <div className="contact-item">
              <strong>Phone:</strong>
              <p>Ph: (+234) 816- 0107510</p>
            </div>
            <div className="contact-item">
              <strong>Email:</strong>
              <p>info@buk.edu.ng</p>
            </div>
            <div className="contact-item">
              <strong>Registry:</strong>
              <p>registry@buk.edu.ng</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Verify BUK-Issued Certificates</h2>
          <p>Start your secure verification process with BUKcertify - the official platform for verifying Bayero University Kano qualifications</p>
          <button className="primary-btn large" onClick={() => setPage('verifier')}>Start Verification with BUKcertify</button>
        </div>
      </section>
    </div>
  );
}

export default LandingPage; 