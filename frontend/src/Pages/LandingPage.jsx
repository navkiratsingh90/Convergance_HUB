import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleTheme } from "../Features/ThemeSlice";

const HomePage = () => {
  const darkMode = useSelector((state) => state.Theme.darkMode);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const features = [
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
    { number: "500+", label: "Monthly Events" }
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with ${email}! We'll keep you updated.`);
    setEmail("");
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Navigation */}
      <nav className={`px-6 py-4 ${darkMode ? "bg-gray-900 border-b border-gray-700" : "bg-white border-b border-gray-200"} sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>DevNetwork</div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
              Sign Up
            </button>
            <button className={`px-4 py-2 rounded-md ${darkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"}`}>
              Login
            </button>
            <button
              onClick={() => dispatch(handleTheme())}
              className={`p-2 rounded-full border ${darkMode ? "border-gray-600 text-gray-300" : "border-gray-300 text-gray-700"}`}
            >
              {darkMode ? "🌙" : "☀️"}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className={`py-20 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Connect. Collaborate. <span className="text-blue-600">Code.</span>
          </h1>
          <p className={`text-lg md:text-xl mb-8 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            The ultimate platform for developers to share projects, find collaborators, join events, and grow their network.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-3 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
              Get Started
            </button>
            <button className={`px-8 py-3 rounded-md border font-medium ${darkMode ? "border-gray-600 text-gray-300 hover:bg-gray-800" : "border-gray-300 text-gray-700 hover:bg-gray-100"}`}>
              Take a Tour
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className={`${darkMode ? "bg-gray-800" : "bg-gray-100"} py-12`}>
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <div className={`text-3xl font-bold ${darkMode ? "text-blue-400" : "text-blue-600"}`}>{s.number}</div>
              <div className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className={`py-16 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Everything You Need to Grow as a Developer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div
                key={i}
                className={`p-6 border rounded-lg shadow-sm hover:shadow-md transition ${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`}
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}>{f.title}</h3>
                <p className={`mb-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{f.description}</p>
                <ul className="space-y-1">
                  {f.benefits.map((b, idx) => (
                    <li key={idx} className={`flex items-center text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      ✅ {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`${darkMode ? "bg-gray-800" : "bg-gray-100"} py-20`}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Ready to Join the Community?
          </h2>
          <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} mb-6`}>
            Create your free account today and start connecting with developers worldwide.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Get Started
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${darkMode ? "bg-gray-900" : "bg-gray-900"} text-white py-12`}>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">DevNetwork</h3>
            <p className="text-sm opacity-70">The premier platform for developers to connect, collaborate, and grow.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Features</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>Social Feed</li>
              <li>Chatrooms</li>
              <li>Events</li>
              <li>Collaborations</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>About</li>
              <li>Careers</li>
              <li>Contact</li>
              <li>Blog</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Connect</h4>
            <div className="flex space-x-3">
              {["Twitter", "GitHub", "LinkedIn", "Discord"].map((p, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center cursor-pointer hover:bg-blue-700 text-white font-bold"
                >
                  {p[0]}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center mt-10 text-sm opacity-60">
          © {new Date().getFullYear()} DevNetwork. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
