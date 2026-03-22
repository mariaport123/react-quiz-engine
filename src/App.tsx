import React, { useState } from 'react';
import { questions } from './quizData';
import { UserResult } from './types';

// Main application component
const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [results, setResults] = useState<UserResult[]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const handleAnswer = (optionId: string, optionText: string) => {
    const currentQuestion = questions[currentStep];
    const isCorrect = optionId === currentQuestion.correctAnswerId;

    if (isCorrect) setScore(prev => prev + 1);

    // Save result for the final table
    setResults([...results, {
      question: currentQuestion.questionText,
      userAnswer: optionText,
      isCorrect
    }]);

    // Give immediate feedback before moving on
    alert(isCorrect ? "Õige vastus!" : "Vale vastus!"); // [cite: 7]

    const nextStep = currentStep + 1;
    if (nextStep < questions.length) {
      setCurrentStep(nextStep);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className="container">
        <h1>Tulemused</h1>
        {/* Table will go here: [cite: 8, 11] */}
        <p>Sinu skoor: {score} / {questions.length}</p>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Question rendering: [cite: 6] */}
      <h2>{questions[currentStep].questionText}</h2>
      <div className="options">
        {questions[currentStep].options.map(option => (
          <button key={option.id} onClick={() => handleAnswer(option.id, option.text)}>
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;