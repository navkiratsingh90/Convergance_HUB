import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

const CSFundamentalsProblem = React.memo(() => {
  const darkMode = useSelector(state => state.Theme.darkMode);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [output, setOutput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const getDifficultyColor = useCallback((difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800';
      case 'medium': return darkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800';
      case 'hard': return darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800';
      default: return darkMode ? 'bg-gray-700' : 'bg-gray-200';
    }
  }, [darkMode]);

  const getTopicColor = useCallback((topic) => {
    switch (topic.toLowerCase()) {
      case 'rdbms': return darkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800';
      case 'oops': return darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800';
      case 'cn': return darkMode ? 'bg-orange-900 text-orange-200' : 'bg-orange-100 text-orange-800';
      case 'os': return darkMode ? 'bg-teal-900 text-teal-200' : 'bg-teal-100 text-teal-800';
      default: return darkMode ? 'bg-gray-700' : 'bg-gray-200';
    }
  }, [darkMode]);

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

  const handleOptionSelect = useCallback((optionId) => {
    if (!isSubmitted) {
      setSelectedOption(optionId);
      setOutput('');
    }
  }, [isSubmitted]);

  const handleSubmitAnswer = useCallback(() => {
    if (!selectedOption) {
      setOutput('Please select an option before submitting.');
      return;
    }

    setIsSubmitted(true);
    const correct = selectedOption === selectedProblem.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setOutput(`🎉 Correct Answer!\n\n+${selectedProblem.points} points awarded\n\nYour answer "${selectedOption}" is correct. ${selectedProblem.explanation}`);
    } else {
      const correctOption = selectedProblem.options.find(opt => opt.id === selectedProblem.correctAnswer);
      setOutput(`❌ Incorrect Answer\n\nNo points awarded\n\nYour answer: ${selectedOption}\nCorrect answer: ${selectedProblem.correctAnswer} - ${correctOption.text}\n\n${selectedProblem.explanation}`);
    }
  }, [selectedOption, selectedProblem]);

  const handleResetProblem = useCallback(() => {
    setSelectedOption('');
    setOutput('');
    setIsSubmitted(false);
    setIsCorrect(false);
  }, []);

  useEffect(() => {
    setSelectedProblem(csFundamentalsProblem);
    setOutput('');
  }, [csFundamentalsProblem]);

  if (!selectedProblem) return null;

  return (
    <div className="w-full">
      <div
        className={`w-full shadow-2xl flex flex-col overflow-hidden ${
          darkMode ? "bg-gray-900 border border-gray-700" : "bg-white border border-gray-200"
        }`}
      >
        {/* ===== Header ===== */}
        <div
          className={`p-5 flex justify-between items-start border-b ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(
                  selectedProblem.difficulty
                )}`}
              >
                {selectedProblem.difficulty}
              </span>
              <span
                className={`px-2 py-1 rounded text-xs ${
                  darkMode ? "bg-blue-900 text-blue-200" : "bg-blue-100 text-blue-800"
                }`}
              >
                {selectedProblem.points} points
              </span>
              <span
                className={`px-2 py-1 rounded text-xs ${getTopicColor(selectedProblem.topic)}`}
              >
                {selectedProblem.topic}
              </span>
              <span
                className={`px-2 py-1 rounded text-xs ${
                  darkMode ? "bg-yellow-900 text-yellow-200" : "bg-yellow-100 text-yellow-800"
                }`}
              >
                CS Fundamentals
              </span>
            </div>
            <h2 className="text-2xl font-bold">{selectedProblem.title}</h2>
          </div>
        </div>

        {/* ===== Content ===== */}
        <div className="flex-1 flex overflow-hidden">
          {/* Problem Description */}
          <div
            className={`w-1/2 overflow-y-auto p-6 border-r ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Question
                </h3>
                <p className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {selectedProblem.question}
                </p>
              </div>

              {/* Options */}
              <div>
                <h3
                  className={`text-lg font-semibold mb-4 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Options
                </h3>
                <div className="space-y-3">
                  {selectedProblem.options.map((option) => (
                    <div
                      key={option.id}
                      onClick={() => handleOptionSelect(option.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedOption === option.id
                          ? darkMode
                            ? 'border-blue-500 bg-blue-900 bg-opacity-20'
                            : 'border-blue-500 bg-blue-100'
                          : darkMode
                            ? 'border-gray-600 hover:border-gray-500 hover:bg-gray-800'
                            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                      } ${isSubmitted && option.id === selectedProblem.correctAnswer ? 'border-green-500 bg-green-100 bg-opacity-20' : ''}
                      ${isSubmitted && selectedOption === option.id && option.id !== selectedProblem.correctAnswer ? 'border-red-500 bg-red-100 bg-opacity-20' : ''}`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 ${
                            selectedOption === option.id
                              ? darkMode
                                ? 'bg-blue-500 text-white border-blue-500'
                                : 'bg-blue-500 text-white border-blue-500'
                              : darkMode
                                ? 'bg-gray-700 text-gray-300 border-gray-600'
                                : 'bg-gray-200 text-gray-700 border-gray-300'
                          } ${
                            isSubmitted && option.id === selectedProblem.correctAnswer
                              ? 'bg-green-500 text-white border-green-500'
                              : ''
                          } ${
                            isSubmitted && selectedOption === option.id && option.id !== selectedProblem.correctAnswer
                              ? 'bg-red-500 text-white border-red-500'
                              : ''
                          }`}
                        >
                          {option.id}
                        </div>
                        <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
                          {option.text}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Concepts */}
              <div>
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Key Concepts
                </h3>
                <ul
                  className={`list-disc list-inside space-y-1 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {selectedProblem.constraints.map((constraint, index) => (
                    <li key={index}>{constraint}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="w-1/2 flex flex-col min-w-0">
            {/* Output Header */}
            <div
              className={`p-3 flex justify-between items-center border-b ${
                darkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <span className={darkMode ? "text-gray-300" : "text-gray-700"}>Result</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleResetProblem}
                  className={`px-3 py-1 rounded text-sm transition ${
                    darkMode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  Reset
                </button>
                <button
                  onClick={() => setOutput("")}
                  className={`px-2 py-1 rounded text-xs ${
                    darkMode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  Clear Output
                </button>
              </div>
            </div>

            {/* Output Display */}
            <div
              className={`flex-1 overflow-auto font-mono text-sm px-4 py-3 ${
                darkMode ? "bg-gray-950" : "bg-gray-100"
              } ${
                isSubmitted
                  ? isCorrect
                    ? darkMode ? "text-green-400" : "text-green-700"
                    : darkMode ? "text-red-400" : "text-red-700"
                  : darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {output || 'Select an option and click "Submit Answer" to check your solution...'}
            </div>

            {/* Submit Button */}
            <div
              className={`p-4 flex gap-3 border-t ${
                darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"
              }`}
            >
              <button
                onClick={handleSubmitAnswer}
                disabled={isSubmitted}
                className={`flex items-center justify-center gap-2 px-6 py-2 rounded-lg font-semibold transition ${
                  isSubmitted
                    ? "bg-gray-400 cursor-not-allowed"
                    : darkMode
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                {isSubmitted ? '✓ Answer Submitted' : '✓ Submit Answer'}
              </button>

              {isSubmitted && (
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isCorrect
                    ? darkMode ? "bg-green-900 text-green-200" : "bg-green-100 text-green-800"
                    : darkMode ? "bg-red-900 text-red-200" : "bg-red-100 text-red-800"
                }`}>
                  <span className="text-lg">
                    {isCorrect ? '🎉' : '❌'}
                  </span>
                  <span className="font-semibold">
                    {isCorrect ? `+${selectedProblem.points} points` : 'No points awarded'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CSFundamentalsProblem;