import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home({ user }) {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Welcome to <span className="brand-highlight">BloomWell</span>
            </h1>
            <p className="hero-subtitle">
              Your personal sanctuary for mindful mood tracking, emotional wellness, and daily reflection
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">10k+</span>
                <span className="stat-label">Happy Users</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50k+</span>
                <span className="stat-label">Mood Entries</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">95%</span>
                <span className="stat-label">Feel Better</span>
              </div>
            </div>
            {!user ? (
              <div className="hero-buttons">
                <Link to="/signup" className="cta-button primary">
                  <span className="button-icon"></span>
                  Start Your Journey
                </Link>
                <Link to="/login" className="cta-button secondary">
                  <span className="button-icon">👋</span>
                  Welcome Back
                </Link>
              </div>
            ) : (
              <div className="hero-buttons">
                <Link to="/mood-checkin" className="cta-button primary">
                  <span className="button-icon">😊</span>
                  Check Your Mood
                </Link>
                <Link to="/diary" className="cta-button secondary">
                  <span className="button-icon">📔</span>
                  Open Diary
                </Link>
              </div>
            )}
          </div>
          <div className="hero-visual">
            <div className="floating-card mood-card">
              <div className="card-icon">😊</div>
              <div className="card-content">
                <h4>Today's Mood</h4>
                <p>Feeling Great!</p>
              </div>
            </div>
            <div className="floating-card diary-card">
              <div className="card-icon">📝</div>
              <div className="card-content">
                <h4>Daily Entry</h4>
                <p>3 new insights</p>
              </div>
            </div>
            <div className="floating-card growth-card">
              <div className="card-icon">📈</div>
              <div className="card-content">
                <h4>Progress</h4>
                <p>+15% happiness</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
         
            <h1 className="hero-title2">
              Everything you need <br></br><span className="brand-highlight2">for emotional wellness</span>
            </h1>
          
          <p className="section-subtitle">
            Powerful tools designed to help you understand, track, and improve your mental health
          </p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
              
            <div className="feature-content">
              <h3>Smart Mood Tracking</h3>
              <p>
                Log your daily emotions with our intuitive mood tracker. 
                Discover patterns and triggers that influence your wellbeing.
              </p>
              <ul className="feature-list">
                <li>5-point mood scale</li>
                <li>Pattern recognition</li>
                <li>Weekly insights</li>
              </ul>
            </div>
          </div>

          <div className="feature-card feature">
            <div className="featured-badge">Most Popular</div>
            
            <div className="feature-content">
              <h3>Personal Diary</h3>
              <p>
                Write your thoughts, experiences, and reflections in a completely 
                private and secure digital space.
              </p>
              <ul className="feature-list">
                <li>Unlimited entries</li>
                <li>Rich text editor</li>
                <li>Search & organize</li>
              </ul>
            </div>
           </div>

          <div className="feature-card">
            
            <div className="feature-content">
              <h3>Growth Analytics</h3>
              <p>
                Watch your mental health journey flourish with detailed insights 
                and progress tracking over time.
              </p>
              <ul className="feature-list">
                <li>Progress charts</li>
                <li>Monthly reports</li>
                <li>Achievement badges</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="benefits-container">
          <div className="benefits-content">
             
           <h1 className="hero-title2">
              Why choose <span className="brand-highlight2">BloomWell?</span>
            </h1>
            <div className="benefits-list">
              <div className="benefit-item">
                <div className="benefit-icon">🔒</div>
                <div className="benefit-text">
                  <h4>100% Private & Secure</h4>
                  <p>Your data stays with you. No sharing, no selling, complete privacy.</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">📱</div>
                <div className="benefit-text">
                  <h4>Always Accessible</h4>
                  <p>Track your mood anytime, anywhere with our responsive design.</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">🧠</div>
                <div className="benefit-text">
                  <h4>Science-Based</h4>
                  <p>Built on proven psychological principles for emotional wellness.</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">💚</div>
                <div className="benefit-text">
                  <h4>Completely Free</h4>
                  <p>All features available at no cost. Your wellbeing shouldn't have a price.</p>
                </div>
              </div>
            </div>
          </div>
         <div className="benefits-visual">
  <div className="wellness-circle">
    <div className="circle-content">
      
      
        <img src="/assets/mood3.jpg" alt="Wellness Visual" className="wellness-image" />

      
      <p>Find Your Balance</p>
    </div>
  </div>
</div>

        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-header">
           <h1 className="hero-title2">
              What our <span className="brand-highlight2">users say</span>
            </h1>
          
          <p className="section-subtitle">
            Join thousands who have improved their mental wellness with BloomWell
          </p>
        </div>
        
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"BloomWell helped me understand my emotions better. The mood tracking feature is incredibly insightful!"</p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">👩‍💻</div>
              <div className="author-info">
                <h4>Sarah M.</h4>
                <span>Software Engineer</span>
              </div>
            </div>
          </div>
          
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"The diary feature is amazing. It's like having a personal therapist available 24/7."</p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">👨‍🎓</div>
              <div className="author-info">
                <h4>Alex R.</h4>
                <span>Graduate Student</span>
              </div>
            </div>
          </div>
          
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"I love how simple and beautiful the interface is. It makes self-care feel effortless."</p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">👩‍🏫</div>
              <div className="author-info">
                <h4>Maria L.</h4>
                <span>Teacher</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to start your wellness journey?</h2>
          <p>Join BloomWell today and take the first step towards better mental health.</p>
          {!user && (
            <Link to="/signup" className="cta-final-button">
              <span className="button-icon">🚀</span>
              Get Started for Free
            </Link>
          )}
        </div>
        <div className="cta-visual">
          <div className="growth-animation">
            <div className="plant-stage stage-1">🌱</div>
            <div className="plant-stage stage-2">🌿</div>
            <div className="plant-stage stage-3">🌳</div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;