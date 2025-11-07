import React, { useState } from 'react';
import { 
  BookOpen, Activity, MessageCircle, Info, PenTool, Heart, Sparkles, 
  Smile, Meh, Frown, TrendingUp, Calendar, Target, Brain, Zap, Sun, Moon, Cloud 
} from 'lucide-react';
import './Dashboard.css';

export default function Dashboard() {
  const [userName] = useState("User");
  const [selectedMood, setSelectedMood] = useState(null);
  const currentHour = new Date().getHours();

  const getGreeting = () => {
    if (currentHour < 12) return "Good Morning";
    if (currentHour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const moods = [
    { icon: <Smile className="icon" />, label: "Great", color: "green-400" },
    { icon: <Meh className="icon" />, label: "Okay", color: "yellow-400" },
    { icon: <Frown className="icon" />, label: "Low", color: "red-400" }
  ];

  const features = [
    { icon: <PenTool className="feature-icon" />, title: "Mood Diary", description: "Write about your day and track your emotions", link: "/diary" },
    { icon: <Activity className="feature-icon" />, title: "Mood Boosters", description: "Discover exercises and activities to lift your spirits", link: "/activities" },
    { icon: <MessageCircle className="feature-icon" />, title: "Counselling", description: "Connect with professional counselors for support", link: "/counselling" },
    { icon: <Info className="feature-icon" />, title: "About BoomWell", description: "Learn more about our mental wellness platform", link: "/about" }
  ];

  const quickActions = [
    { icon: <Brain className="quick-icon" />, label: "Meditation", time: "5 min" },
    { icon: <Zap className="quick-icon" />, label: "Quick Exercise", time: "10 min" },
    { icon: <Target className="quick-icon" />, label: "Daily Goal", time: "Set now" }
  ];

  const recentActivities = [
    { date: "Today", activity: "Morning meditation completed", icon: <Sun className="recent-icon" /> },
    { date: "Yesterday", activity: "Wrote in mood diary", icon: <Moon className="recent-icon" /> },
    { date: "2 days ago", activity: "Breathing exercises", icon: <Cloud className="recent-icon" /> }
  ];

  const weeklyInsight = {
    trend: "improving",
    percentage: "15%",
    message: "Your mood has been improving this week!"
  };

  return (
    <div className="dashboard min-h-screen bg-black">
      {/* Header */}
      <header className="header bg-gray-900 border-b border-green-500/20 sticky top-0 z-50">
        <div className="container">
          <div className="header-inner">
            <div className="logo-group">
              <div className="logo-icon"><Heart /></div>
              <h1 className="logo-text">BoomWell</h1>
            </div>
            <div className="user-icon">{userName.charAt(0)}</div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="main-content container py-8">
        {/* Welcome */}
        <div className="welcome text-center mb-8">
          <Sparkles className="w-8 h-8 text-green-400 animate-pulse mx-auto" />
          <h2 className="text-4xl font-bold text-white mb-3">{getGreeting()}, {userName}! 👋</h2>
          <p className="text-xl text-gray-400">Welcome to your mental wellness journey</p>
        </div>

        {/* Mood Check */}
        <div className="mood-check mb-8 max-w-2xl mx-auto p-6 rounded-2xl border border-green-500/20 bg-gray-900">
          <h3 className="text-lg font-semibold text-white mb-4 text-center">How are you feeling right now?</h3>
          <div className="flex justify-center space-x-4">
            {moods.map((mood, index) => (
              <button
                key={index}
                onClick={() => setSelectedMood(mood.label)}
                className={`mood-btn ${selectedMood === mood.label ? `selected ${mood.color}` : ""}`}
              >
                <div>{mood.icon}</div>
                <span className="text-sm text-gray-300">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Weekly Insight & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="weekly-insight lg:col-span-2 p-6 rounded-2xl border border-green-500/30 bg-gradient-to-br from-green-500/10 to-green-500/5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Weekly Insight</h3>
                <p className="text-gray-400">{weeklyInsight.message}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
            <div className="flex items-end space-x-2">
              <span className="text-5xl font-bold text-green-400">{weeklyInsight.percentage}</span>
              <span className="text-gray-400 mb-2">better than last week</span>
            </div>
          </div>

          <div className="quick-actions p-6 rounded-2xl border border-green-500/20 bg-gray-900">
            <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <button key={index} className="quick-action-btn">
                  <div className="flex items-center space-x-3">
                    <div className="text-green-400">{action.icon}</div>
                    <span className="text-white">{action.label}</span>
                  </div>
                  <span className="text-sm text-gray-500">{action.time}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="features mb-8">
          <h3 className="text-2xl font-semibold text-white mb-6">Explore Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="p-8 flex items-start space-x-4">
                  <div className="feature-icon-bg">{feature.icon}</div>
                  <div>
                    <h4 className="text-xl font-semibold text-white">{feature.title}</h4>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities & Quote */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="recent-activities p-6 rounded-2xl border border-green-500/20 bg-gray-900">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center justify-between">
              Recent Activities <Calendar className="w-5 h-5 text-green-400" />
            </h3>
            <div className="space-y-3">
              {recentActivities.map((item, index) => (
                <div key={index} className="activity-item flex items-start space-x-3 p-3 bg-black/50 rounded-lg border border-green-500/10">
                  <div className="text-green-400 mt-1">{item.icon}</div>
                  <div className="flex-1">
                    <p className="text-white text-sm">{item.activity}</p>
                    <p className="text-gray-500 text-xs mt-1">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="quote p-6 rounded-2xl border border-green-500/30 bg-gradient-to-r from-gray-900 to-black shadow-2xl shadow-green-500/10">
            <p className="text-lg text-gray-300 mb-3 italic">
              "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity."
            </p>
            <p className="text-green-400/80">— Take care of yourself today</p>
          </div>
        </div>
      </main>
    </div>
  );
}
