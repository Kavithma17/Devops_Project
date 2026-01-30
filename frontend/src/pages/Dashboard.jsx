import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, Activity, BookMarked, Heart, Sparkles, 
  Smile, Meh, Frown, ArrowRight, User
} from 'lucide-react';
import './Dashboard.css';

export default function Dashboard() {
  const [userName] = useState("User");
  const [selectedMood, setSelectedMood] = useState(null);
  const navigate = useNavigate();
  const currentHour = new Date().getHours();

  const getGreeting = () => {
    if (currentHour < 12) return "Good Morning";
    if (currentHour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const moods = [
    { icon: <Smile className="mood-icon" />, label: "Great", color: "green" },
    { icon: <Meh className="mood-icon" />, label: "Okay", color: "yellow" },
    { icon: <Frown className="mood-icon" />, label: "Low", color: "red" }
  ];

  const navigationCards = [
    { 
      icon: <BookOpen className="card-icon" />, 
      title: "Mood Diary", 
      description: "Write about your day and track your emotions",
      link: "/diary",
      gradient: "from-green-500/20 to-emerald-500/20"
    },
    { 
      icon: <Activity className="card-icon" />, 
      title: "Exercises", 
      description: "Guided activities to boost your mental wellness",
      link: "/exercises",
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    { 
      icon: <BookMarked className="card-icon" />, 
      title: "Resources", 
      description: "Articles, tips, and professional support",
      link: "/resources",
      gradient: "from-purple-500/20 to-pink-500/20"
    }
  ];

  const handleNavigation = (link) => {
    navigate(link);
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-container">
          <div className="logo-section">
            <Heart className="logo-heart" />
            <h1 className="logo-title">BoomWell</h1>
          </div>
          <div className="user-profile">
            <User className="user-icon" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Welcome Section */}
        <div className="welcome-section">
          <Sparkles className="welcome-sparkles" />
          <h2 className="welcome-heading">
            {getGreeting()}, {userName}! 👋
          </h2>
          <p className="welcome-subtitle">
            Welcome to your mental wellness journey
          </p>
        </div>

       

        {/* Navigation Cards */}
        <div className="navigation-section">
          <h3 className="section-heading">Explore</h3>
          <div className="navigation-grid">
            {navigationCards.map((card, index) => (
              <div
                key={index}
                onClick={() => handleNavigation(card.link)}
                className={`nav-card bg-gradient-to-br ${card.gradient}`}
              >
                <div className="nav-card-content">
                  <div className="nav-card-icon-wrapper">
                    {card.icon}
                  </div>
                  <h4 className="nav-card-title">{card.title}</h4>
                  <p className="nav-card-description">{card.description}</p>
                </div>
                <div className="nav-card-footer">
                  <span className="nav-card-link">Get Started</span>
                  <ArrowRight className="arrow-icon" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <div className="quote-card">
          <p className="quote-text">
            "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity."
          </p>
          <p className="quote-author">— Take care of yourself today</p>
        </div>
      </main>
    </div>
  );
}