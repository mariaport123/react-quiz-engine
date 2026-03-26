import React, { useState, useMemo } from 'react';
import { questions } from './quizData';
import { UserResult } from './types';
import './App.css';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [results, setResults] = useState<UserResult[]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Randomize options using Fisher-Yates algorithm
  const shuffledOptions = useMemo(() => {
    const options = [...questions[currentStep].options];
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
  }, [currentStep]);

  // Handle answer logic
  const handleAnswer = (optionId: string, optionText: string) => {
    const currentQuestion = questions[currentStep];
    const isCorrect = optionId === currentQuestion.correctAnswerId;

    if (isCorrect) setScore((prev) => prev + 1);

    setResults([...results, {
      question: currentQuestion.questionText,
      userAnswer: optionText,
      isCorrect: isCorrect
    }]);

    setFeedback(isCorrect ? "Õige vastus!" : "Vale vastus!");

    setTimeout(() => {
      setFeedback(null);
      if (currentStep + 1 < questions.length) {
        setCurrentStep(currentStep + 1);
      } else {
        setIsFinished(true);
      }
    }, 1200);
  };

  // Consistent brand header component
  const Header = ({ title }: { title: string }) => (
    <header className="app-header">
      <div className="header-content">
        <div className="logo-container">
          <img src="/ES_Logo.svg" alt="Statistikaamet" className="stat-logo" />
        </div>
        <div className="header-divider"></div>
        <h1 className="header-title">{title}</h1>
      </div>
    </header>
  );

  if (isFinished) {
    return (
      <div className="app-wrapper">
        <Header title="Tulemused" />
        <main className="container">
          <p className="score-display">{score} / {questions.length}</p>
          <table className="results-table">
            <thead>
              <tr>
                <th>Küsimus</th>
                <th>Vastus</th>
                <th>Tulemus</th>
              </tr>
            </thead>
            <tbody>
              {results.map((res, i) => (
                <tr key={i}>
                  <td>{res.question}</td>
                  <td>{res.userAnswer}</td>
                  <td className={res.isCorrect ? "status-correct" : "status-wrong"}>
                    {res.isCorrect ? "Õige" : "Vale"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="retry-btn" onClick={() => window.location.reload()}>Proovi uuesti</button>
        </main>
      </div>
    );
  }

  return (
    <div className="app-wrapper">
      <Header title="Viktoriin" />
      <main className="container">
        <span className="step-indicator">KÜSIMUS {currentStep + 1} / {questions.length}</span>
        <h2>{questions[currentStep].questionText}</h2>
        <div className="options-list">
          {shuffledOptions.map((option) => (
            <button key={option.id} onClick={() => handleAnswer(option.id, option.text)} disabled={!!feedback}>
              {option.text}
            </button>
          ))}
        </div>
        {feedback && <div className={`feedback-alert ${feedback === 'Õige vastus!' ? 'correct' : 'wrong'}`}>{feedback}</div>}
      </main>
    </div>
  );
};

export default App;