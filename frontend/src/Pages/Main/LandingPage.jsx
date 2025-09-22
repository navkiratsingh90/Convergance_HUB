import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";

const HomePage = () => {
  const darkMode = useSelector((state) => state.Theme.darkMode);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [activeFAQ, setActiveFAQ] = useState(null);

  const features = [
    {
      title: "Code & Decode",
      description: "Participate in coding contests, solve daily puzzles, and challenge yourself with coding questions.",
      icon: "🧩",
      benefits: ["Daily coding challenges", "Compete with developers worldwide", "Improve problem-solving skills", "Win prizes and recognition"]
    },
    {
      title: "Smart Project Matching",
      description: "Find the perfect collaborators for your projects based on skills, experience, and availability.",
      icon: "🔍",
      benefits: ["AI-powered matching algorithm", "Filter by tech stack and experience", "Time commitment matching", "Portfolio-based selection"]
    },
    {
      title: "Active Posting",
      description: "Share your projects, ideas, and knowledge with the developer community.",
      icon: "💬",
      benefits: ["Reach a targeted audience", "Get feedback on your work", "Build your reputation"]
    },
    {
      title: "Real-time Chatrooms",
      description: "Connect with developers instantly through topic-based chatrooms.",
      icon: "💻",
      benefits: ["Discuss specific technologies", "Get help with coding problems", "Network in real-time"]
    },
    {
      title: "Event Promotion",
      description: "Discover and promote tech events, hackathons, and meetups.",
      icon: "📅",
      benefits: ["Find local developer events", "Promote your own events", "Connect with attendees"]
    },
    {
      title: "Find Similar People",
      description: "Connect with developers who share your interests and tech stack.",
      icon: "👥",
      benefits: ["Match based on skills", "Find collaboration partners", "Build your professional network"]
    },
    {
      title: "Project Collaboration",
      description: "Find team members for your projects or join exciting new initiatives.",
      icon: "🤝",
      benefits: ["Showcase your projects", "Find skilled collaborators", "Manage tasks together"]
    },
    {
      title: "Learning Resources",
      description: "Access curated learning materials and share knowledge with peers.",
      icon: "📚",
      benefits: ["Share tutorials and guides", "Discover new technologies", "Learn from experts"]
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Developers" },
    { number: "120+", label: "Countries" },
    { number: "25K+", label: "Projects Shared" },
    { number: "500+", label: "Monthly Events" },
    { number: "10K+", label: "Daily Coding Challenges" },
    { number: "5K+", label: "Successful Matches" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Frontend Developer",
      avatar: "SJ",
      text: "Found my current job through DevNetwork! The community is incredibly supportive and the project collaboration features are amazing.",
      rating: 5,
      company: "Tech Innovations Inc."
    },
    {
      name: "Michael Chen",
      role: "Full Stack Developer",
      avatar: "MC",
      text: "The Code & Decode challenges have significantly improved my problem-solving skills. I've landed two job offers thanks to my contest rankings!",
      rating: 5,
      company: "Digital Solutions LLC"
    },
    {
      name: "Jessica Williams",
      role: "UX Engineer",
      avatar: "JW",
      text: "As a remote worker, DevNetwork has been invaluable for staying connected with the developer community and finding new opportunities.",
      rating: 4,
      company: "WebCraft Studios"
    },
    {
      name: "David Kim",
      role: "DevOps Engineer",
      avatar: "DK",
      text: "The smart matching algorithm found me the perfect team for my startup idea. We've been working together for 6 months now and just secured funding!",
      rating: 5,
      company: "Cloud Systems Ltd."
    }
  ];

  const faqs = [
    {
      question: "How much does it cost to join DevNetwork?",
      answer: "DevNetwork offers a free basic plan with access to most features. Premium plans start at $9.99/month."
    },
    {
      question: "Can I use DevNetwork to find job opportunities?",
      answer: "Yes! Showcase your projects and connect with potential employers directly."
    },
    {
      question: "How does the Code & Decode contest system work?",
      answer: "We host daily coding challenges and weekly themed contests. Points are awarded based on solution efficiency and code quality, with leaderboards tracking top performers."
    },
    {
      question: "How does the project matching algorithm work?",
      answer: "Our AI analyzes your skills, project preferences, availability, and past work to find the most compatible collaborators for your projects."
    },
    {
      question: "Is my data secure on DevNetwork?",
      answer: "All data is encrypted, and we never share your personal information without consent."
    },
    {
      question: "Can I promote my own events on the platform?",
      answer: "Yes! Create, manage, and promote events to the community or specific interest groups."
    },
    {
      question: "Do coding contests have prizes?",
      answer: "Yes! Top performers win cash prizes, premium subscriptions, and exclusive job opportunities from our partner companies."
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Create Your Profile",
      description: "Set up your developer profile with your skills, interests, and portfolio projects.",
      icon: "👤"
    },
    {
      step: 2,
      title: "Take a Skills Assessment",
      description: "Complete our coding assessment to help us match you with appropriate challenges and collaborators.",
      icon: "📝"
    },
    {
      step: 3,
      title: "Join Challenges & Find Projects",
      description: "Participate in coding contests or browse projects looking for collaborators.",
      icon: "🧩"
    },
    {
      step: 4,
      title: "Collaborate & Grow",
      description: "Work on projects together, share knowledge, and advance your career.",
      icon: "🚀"
    }
  ];

  const toggleFAQ = (index) => setActiveFAQ(activeFAQ === index ? null : index);

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with ${email}! We'll keep you updated.`);
    setEmail("");
  };

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-400'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));

  return (
    <>

      {/* Hero Section */}
      <section className={`h-screen flex items-center ${darkMode ? 'bg-gray-900' : 'bg-blue-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Connect. Collaborate. <span className="text-blue-500">Code.</span>
          </h1>
          <p className={`text-xl max-w-3xl mx-auto mb-10 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            The ultimate platform for developers to share projects, find collaborators, join events, solve coding challenges, and grow their network in the tech community.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-3 rounded-lg text-lg font-semibold bg-blue-600 text-white hover:bg-blue-700">Get Started</button>
            <button className="px-8 py-3 rounded-lg text-lg font-semibold border border-blue-400 text-blue-600 hover:bg-blue-50">Explore Challenges</button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i}>
              <div className={`text-3xl md:text-4xl font-bold mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{stat.number}</div>
              <div className={`text-sm md:text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Everything You Need to Grow as a Developer</h2>
          <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Connect, learn, collaborate, and challenge yourself.</p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className={`p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-2 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{f.title}</h3>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{f.description}</p>
              <ul className="space-y-2">
                {f.benefits.map((b, j) => (
                  <li key={j} className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 mt-0.5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>How DevNetwork Works</h2>
          <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Follow these simple steps to begin your journey.</p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {howItWorks.map((s, i) => (
            <div key={i}>
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl ${darkMode ? 'bg-blue-800' : 'bg-blue-100'}`}>{s.icon}</div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 ${darkMode ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white'} font-bold`}>{s.step}</div>
              <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{s.title}</h3>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-blue-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>What Developers Say</h2>
          <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Join thousands of developers who have found their community on our platform.</p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mr-4">
                  <span className="text-white font-bold">{t.avatar}</span>
                </div>
                <div>
                  <h4 className={`${darkMode ? 'text-white' : 'text-gray-800'} font-semibold`}>{t.name}</h4>
                  <p className={darkMode ? 'text-blue-400' : 'text-blue-600'}>{t.role}</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>{t.company}</p>
                </div>
              </div>
              <div className="flex mb-4">{renderStars(t.rating)}</div>
              <p className={`italic ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>"{t.text}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Frequently Asked Questions</h2>
          <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Everything you need to know about the platform.</p>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className={`rounded-xl overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
              <button className={`flex justify-between items-center w-full p-6 text-left ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-blue-100'}`} onClick={() => toggleFAQ(i)}>
                <span className={`${darkMode ? 'text-white' : 'text-gray-800'} font-semibold`}>{f.question}</span>
                <svg className={`w-5 h-5 transition-transform ${activeFAQ === i ? 'rotate-180' : ''} ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeFAQ === i && <div className="p-6 border-t border-gray-200"><p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{f.answer}</p></div>}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 ${darkMode ? 'bg-blue-900' : 'bg-blue-600'} text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join the Community?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-10 opacity-90">Create your free account today and start connecting with developers worldwide.</p>
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button type="submit" className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100">Get Started</button>
            </form>
          </div>
        </div>
      </section>

      
    </>
  );
};

export default HomePage;