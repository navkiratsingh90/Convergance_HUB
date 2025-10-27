import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import CodeEditor from '../../components/CodeEditor';
import DailyCodingChallenge from '../../components/DailyCodingChallenge';



const CodeDecodeSection = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [userCode, setUserCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [language, setLanguage] = useState('javascript');

  // Daily Problem
  const csFundamentalsProblem = useMemo(() => ({
    id: 1,
    name: "database-normalization",
    title: "Database Normalization - Fundamental Concept",
    topic: "RDBMS",
    difficulty: "Medium",
    points: 10,
    question: "Which of the following best describes the purpose of database normalization?",
    explanation: "Database normalization is a process used to organize a database into tables and columns to reduce data redundancy and improve data integrity.",
    options: [
      { id: 'A', text: "To reduce data redundancy and dependency" },
      { id: 'B', text: "To increase data duplication for faster access" },
      { id: 'C', text: "To complicate the database structure" },
      { id: 'D', text: "To eliminate all primary keys from tables" }
    ],
    correctAnswer: 'A',
    constraints: [
      "Normalization follows specific normal forms (1NF, 2NF, 3NF, etc.)",
      "It helps in minimizing data redundancy",
      "It improves data integrity and reduces update anomalies",
      "It may require more joins in queries"
    ]
  }), []);
  const dailyProblem = useMemo(() => ({
    id: 1,
    name : "two-sum",
    title: "Two Sum - Daily Challenge",
    difficulty: "Easy",
    points: 15,
    question: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    example: "Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0,1].",
    starterCode: `function twoSum(nums, target) {
  // Your code here
  // Return indices of two numbers that add up to target
}`,
    testCases: [
      { input: [[2,7,11,15], 9], output: [0,1] },
      { input: [[3,2,4], 6], output: [1,2] },
      { input: [[3,3], 6], output: [0,1] }
    ]
  }), []);

  // All-time Leaderboard
  const leaderboard = useMemo(() => [
    { rank: 1, name: "Alex Chen", points: 1245, problemsSolved: 89, avatar: "AC" },
    { rank: 2, name: "Sarah Kim", points: 1180, problemsSolved: 84, avatar: "SK" },
    { rank: 3, name: "Mike Rodriguez", points: 1120, problemsSolved: 81, avatar: "MR" },
    { rank: 4, name: "You", points: 985, problemsSolved: 72, avatar: "ME" },
    { rank: 5, name: "Emma Wilson", points: 920, problemsSolved: 68, avatar: "EW" },
    { rank: 6, name: "James Brown", points: 875, problemsSolved: 65, avatar: "JB" },
    { rank: 7, name: "Lisa Zhang", points: 810, problemsSolved: 61, avatar: "LZ" }
  ], []);

  // User Progress - Problems solved this month
  const monthlyProgress = useMemo(() => ({
    totalSolved: 12,
    easySolved: 8,
    mediumSolved: 3,
    hardSolved: 1,
    currentStreak: 5,
    pointsEarned: 180,
    solvedProblems: [
      { id: 1, title: "Reverse String", difficulty: "Easy", date: "2024-01-22", points: 10 },
      { id: 2, title: "Valid Parentheses", difficulty: "Easy", date: "2024-01-21", points: 10 },
      { id: 3, title: "Merge Two Sorted Lists", difficulty: "Medium", date: "2024-01-20", points: 15 },
      { id: 4, title: "Binary Search", difficulty: "Easy", date: "2024-01-19", points: 10 },
      { id: 5, title: "Climbing Stairs", difficulty: "Easy", date: "2024-01-18", points: 10 },
      { id: 6, title: "Maximum Subarray", difficulty: "Medium", date: "2024-01-17", points: 15 }
    ]
  }), []);

  const toggleTheme = useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);

  const handleSolveDaily = useCallback(() => {
    setSelectedChallenge(dailyProblem);
    setUserCode(dailyProblem.starterCode);
    setOutput('');
    setLanguage('javascript');
  }, [dailyProblem]);

  const getDifficultyColor = useCallback((difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800';
      case 'medium': return darkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800';
      case 'hard': return darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800';
      default: return darkMode ? 'bg-gray-700' : 'bg-gray-200';
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} ${darkMode ? 'text-white' : 'text-gray-800'}`}>
      {/* Header */}
      <header className={`py-4 px-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-blue-500">Code & Decode</h1>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              darkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'
            }`}>
              Practice Platform
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                darkMode 
                  ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
            <Link 
              to="/dashboard"
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Daily Problem & User Progress */}
          <div className="lg:col-span-2 space-y-8">
            {/* Daily Problem */}
            <div className={`rounded-2xl shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="p-6 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold flex items-center space-x-3">
                    <span>⭐</span>
                    <span>Daily Problem</span>
                  </h2>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(dailyProblem.difficulty)}`}>
                      {csFundamentalsProblem.difficulty}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${darkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800'}`}>
                      {csFundamentalsProblem.points} points
                    </span>
                  </div>
                </div>
                <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Solve today's challenge to continue your streak!
                </p>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">{csFundamentalsProblem.title}</h3>
                <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {csFundamentalsProblem.question}
                </p>
                
                <div className={`p-4 rounded-lg mb-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <h4 className={`font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Example:</h4>
                  <pre className={`font-mono text-sm whitespace-pre-wrap ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {csFundamentalsProblem.example}
                  </pre>
                </div>
                <Link to={`/code-decode/${csFundamentalsProblem.name}`}>
                <button
                  onClick={handleSolveDaily}
                  className={`w-full py-4 rounded-lg font-bold text-lg transition-all hover:scale-105 ${
                    darkMode 
                      ? 'bg-yellow-600 hover:bg-yellow-700' 
                      : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                  }`}
                >
                  🚀 Solve Daily Challenge
                </button>
                </Link>
              </div>
            </div>

            {/* Monthly Progress */}
            <div className={`rounded-2xl shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-2xl font-bold flex items-center space-x-3">
                  <span>📊</span>
                  <span>Your Progress This Month</span>
                </h2>
                <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Problems solved in January 2024
                </p>
              </div>
              
              <div className="p-6">
                {/* Progress Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className={`p-4 rounded-lg text-center ${darkMode ? 'bg-blue-900 bg-opacity-50' : 'bg-blue-100'}`}>
                    <div className="text-2xl font-bold text-blue-500">{monthlyProgress.totalSolved}</div>
                    <div className="text-sm">Total Solved</div>
                  </div>
                  <div className={`p-4 rounded-lg text-center ${darkMode ? 'bg-green-900 bg-opacity-50' : 'bg-green-100'}`}>
                    <div className="text-2xl font-bold text-green-500">{monthlyProgress.easySolved}</div>
                    <div className="text-sm">Easy</div>
                  </div>
                  <div className={`p-4 rounded-lg text-center ${darkMode ? 'bg-yellow-900 bg-opacity-50' : 'bg-yellow-100'}`}>
                    <div className="text-2xl font-bold text-yellow-500">{monthlyProgress.mediumSolved}</div>
                    <div className="text-sm">Medium</div>
                  </div>
                  <div className={`p-4 rounded-lg text-center ${darkMode ? 'bg-red-900 bg-opacity-50' : 'bg-red-100'}`}>
                    <div className="text-2xl font-bold text-red-500">{monthlyProgress.hardSolved}</div>
                    <div className="text-sm">Hard</div>
                  </div>
                </div>

                {/* Streak & Points */}
                <div className="flex justify-between items-center mb-6 p-4 rounded-lg bg-gray-700 bg-opacity-20">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-500">🔥 {monthlyProgress.currentStreak}</div>
                    <div className="text-sm">Current Streak</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-500">⭐ {monthlyProgress.pointsEarned}</div>
                    <div className="text-sm">Points Earned</div>
                  </div>
                </div>

                {/* Solved Problems List */}
                <div className="space-y-3">
                  <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Recently Solved Problems
                  </h3>
                  {monthlyProgress.solvedProblems.map((problem) => (
                    <div
                      key={problem.id}
                      className={`p-3 rounded-lg border ${
                        darkMode ? 'border-gray-700' : 'border-gray-200'
                      } flex justify-between items-center`}
                    >
                      <div>
                        <div className="font-medium">{problem.title}</div>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(problem.difficulty)}`}>
                            {problem.difficulty}
                          </span>
                          <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {problem.date}
                          </span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        darkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        +{problem.points}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Leaderboard */}
          <div className="space-y-8">
            {/* All-time Leaderboard */}
            <div className={`rounded-2xl shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-2xl font-bold flex items-center space-x-3">
                  <span>🏆</span>
                  <span>All-time Leaderboard</span>
                </h2>
                <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Top performers of all time
                </p>
              </div>
              
              <div className="p-6">
                <div className="space-y-3">
                  {leaderboard.map((user) => (
                    <div
                      key={user.rank}
                      className={`p-4 rounded-lg transition-all ${
                        user.name === "You" 
                          ? darkMode 
                            ? 'bg-blue-900 bg-opacity-30 border-2 border-blue-500' 
                            : 'bg-blue-100 border-2 border-blue-400'
                          : darkMode 
                            ? 'bg-gray-700 bg-opacity-20 hover:bg-gray-700' 
                            : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            user.rank === 1 
                              ? 'bg-yellow-500 text-white'
                              : user.rank === 2
                                ? 'bg-gray-400 text-white'
                                : user.rank === 3
                                  ? 'bg-orange-500 text-white'
                                  : darkMode
                                    ? 'bg-gray-600'
                                    : 'bg-gray-300'
                          }`}>
                            {user.rank}
                          </div>
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                            darkMode ? 'bg-blue-600' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {user.avatar}
                          </div>
                          <div>
                            <div className="font-semibold">{user.name}</div>
                            <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {user.problemsSolved} problems
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-yellow-500">{user.points}</div>
                          <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            points
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className={`rounded-2xl shadow-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
                <span>⚡</span>
                <span>Quick Stats</span>
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Global Rank</span>
                  <span className="font-semibold">#4</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Total Points</span>
                  <span className="font-semibold text-yellow-500">985</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Problems Solved</span>
                  <span className="font-semibold">72</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Success Rate</span>
                  <span className="font-semibold text-green-500">87%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Challenge Modal */}
      <DailyCodingChallenge 
        selectedChallenge={selectedChallenge}
        setSelectedChallenge={setSelectedChallenge}
        darkMode={darkMode}
        userCode={userCode}
        setUserCode={setUserCode}
        output={output}
        setOutput={setOutput}
        language={language}
        setLanguage={setLanguage}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
      />
    </div>
  );
};

export default CodeDecodeSection;