import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import CodeEditor from './CodeEditor';
import { useSelector } from 'react-redux';

const DailyCodingChallenge = React.memo(() => {
	const darkMode = useSelector(state => state.Theme.darkMode);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [userCode, setUserCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [language, setLanguage] = useState('javascript');
  const handleRunCode = useCallback(() => {
    if (!selectedChallenge) return;
    
    setIsRunning(true);
    setOutput('Running your code...\n\n');
    
    // Simulate code execution with test cases
    setTimeout(() => {
      const results = selectedChallenge.testCases.map((testCase, index) => {
        return `Test Case ${index + 1}: ✓ Passed\n  Input: ${JSON.stringify(testCase.input)}\n  Expected: ${JSON.stringify(testCase.output)}\n  Received: ${JSON.stringify(testCase.output)}\n`;
      }).join('\n');
      
      setOutput(`✓ All test cases passed!\n\n${results}\nExecution time: 2ms\nMemory used: 36.8MB`);
      setIsRunning(false);
    }, 2000);
  }, [selectedChallenge, setIsRunning, setOutput]);
  const handleSubmitSolution = useCallback(() => {
    if (!selectedChallenge) return;
    
    setIsRunning(true);
    setOutput('Submitting your solution...\n\n');
    
    setTimeout(() => {
      setOutput(`🎉 Solution Accepted!\n\n+${selectedChallenge.points} points awarded\n\n✅ All test cases passed\n⏱️  Runtime: Beats 85% of submissions\n💾 Memory: Beats 92% of submissions\n\nGreat job! Your solution is optimal.`);
      setIsRunning(false);
    }, 1500);
  }, [selectedChallenge, setIsRunning, setOutput]);

  // const handleResetCode = useCallback(() => {
  //   if (selectedChallenge) {
  //     setUserCode(selectedChallenge.starterCode);
  //     setOutput('');
  //   }
  // }, [selectedChallenge, setUserCode, setOutput]);

  const getDifficultyColor = useCallback((difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800';
      case 'medium': return darkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800';
      case 'hard': return darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800';
      default: return darkMode ? 'bg-gray-700' : 'bg-gray-200';
    }
  }, [darkMode]);
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
	useEffect(() => {
		setSelectedChallenge(dailyProblem);
		setUserCode(dailyProblem.starterCode);
		setOutput('');
		setLanguage('javascript');
	}, [dailyProblem]);
	
	if (!selectedChallenge) return null; // move AFTER useEffect
	
  return (
    <div className="w-full">
      <div
        className={`w-full  shadow-2xl flex flex-col overflow-hidden ${
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
                  selectedChallenge.difficulty
                )}`}
              >
                {selectedChallenge.difficulty}
              </span>
              <span
                className={`px-2 py-1 rounded text-xs ${
                  darkMode ? "bg-blue-900 text-blue-200" : "bg-blue-100 text-blue-800"
                }`}
              >
                {selectedChallenge.points} points
              </span>
              <span
                className={`px-2 py-1 rounded text-xs ${
                  darkMode ? "bg-yellow-900 text-yellow-200" : "bg-yellow-100 text-yellow-800"
                }`}
              >
                Daily Challenge
              </span>
            </div>
            <h2 className="text-2xl font-bold">{selectedChallenge.title}</h2>
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
                  Problem Description
                </h3>
                <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                  {selectedChallenge.question}
                </p>
              </div>

              {/* Example */}
              <div>
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Example
                </h3>
                <div
                  className={`p-4 rounded-lg font-mono text-sm ${
                    darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-700"
                  }`}
                >
                  <pre className="whitespace-pre-wrap">{selectedChallenge.example}</pre>
                </div>
              </div>

              {/* Constraints */}
              <div>
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Constraints
                </h3>
                <ul
                  className={`list-disc list-inside space-y-1 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <li>2 ≤ nums.length ≤ 10⁴</li>
                  <li>-10⁹ ≤ nums[i] ≤ 10⁹</li>
                  <li>-10⁹ ≤ target ≤ 10⁹</li>
                  <li>Only one valid answer exists</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Code Editor + Output */}
          <div className="w-1/2 flex flex-col min-w-0">
            {/* Editor Header */}
            <div
              className={`p-3 flex justify-between items-center border-b ${
                darkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className={`px-3 py-1 rounded border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    darkMode
                      ? "bg-gray-800 border-gray-700 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                </select>

                {/* <button
                  onClick={handleResetCode}
                  className={`px-3 py-1 rounded text-sm transition ${
                    darkMode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  Reset Code
                </button> */}
              </div>

              <span className={darkMode ? "text-gray-400 text-sm" : "text-gray-600 text-sm"}>
                Auto-save: On
              </span>
            </div>

            {/* Code Editor */}
            <div className="flex-1 min-h-0 border-b border-gray-700">
              <CodeEditor
                code={userCode}
                onChange={setUserCode}
                darkMode={darkMode}
                language={language}
              />
            </div>

            {/* Output Section */}
            <div
              className={`h-48 flex flex-col border-t ${
                darkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <div
                className={`flex justify-between items-center px-4 py-2 border-b ${
                  darkMode ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <span className={darkMode ? "text-gray-300" : "text-gray-700"}>Output</span>
                <button
                  onClick={() => setOutput("")}
                  className={`px-2 py-1 rounded text-xs ${
                    darkMode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  Clear
                </button>
              </div>

              <div
                className={`flex-1 overflow-auto font-mono text-sm px-4 py-3 ${
                  darkMode ? "bg-gray-950 text-green-400" : "bg-gray-100 text-green-700"
                }`}
              >
                {isRunning ? (
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 border-b-2 border-blue-500 rounded-full animate-spin"></div>
                    <span>{output}</span>
                  </div>
                ) : (
                  output || 'Click "Run Code" to test your solution...'
                )}
              </div>
            </div>

            {/* Buttons */}
            <div
              className={`p-4 flex gap-3 border-t ${
                darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"
              }`}
            >
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className={`flex items-center justify-center gap-2 px-6 py-2 rounded-lg font-semibold transition ${
                  isRunning
                    ? "bg-gray-400 cursor-not-allowed"
                    : darkMode
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                ▶ Run Code
              </button>

              <button
                onClick={handleSubmitSolution}
                disabled={isRunning}
                className={`flex items-center justify-center gap-2 px-6 py-2 rounded-lg font-semibold transition ${
                  isRunning
                    ? "bg-gray-400 cursor-not-allowed"
                    : darkMode
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                ✓ Submit Solution
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});


export default DailyCodingChallenge