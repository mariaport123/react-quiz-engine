import React, { useState, useMemo } from 'react';
import { questions } from './quizData';
import { UserResult } from './types';
import './App.css';

// TypeScript support for the official web component
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stat-ee-header-social': any;
    }
  }
}

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [results, setResults] = useState<UserResult[]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Shuffle current question's options using Fisher-Yates algorithm
  const shuffledOptions = useMemo(() => {
    const options = [...questions[currentStep].options];
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
  }, [currentStep]);

  // Handle user answer selection
  const handleAnswer = (optionId: string, optionText: string) => {
    const currentQuestion = questions[currentStep];
    const isCorrect = optionId === currentQuestion.correctAnswerId;

    if (isCorrect) setScore((prev) => prev + 1);

    setResults([
      ...results,
      {
        question: currentQuestion.questionText,
        userAnswer: optionText,
        isCorrect
      }
    ]);

    setFeedback(isCorrect ? "Õige vastus!" : "Vale vastus!");

    // Move to next question or finish quiz after delay
    setTimeout(() => {
      setFeedback(null);
      if (currentStep + 1 < questions.length) {
        setCurrentStep(currentStep + 1);
      } else {
        setIsFinished(true);
      }
    }, 1200);
  };

  // Return personalized feedback message based on score
  const getFeedbackMessage = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage === 100) return "Suurepärane! Oled tõeline statistikaguru ja tunned tarbijahinnaindeksit peast.";
    if (percentage >= 70) return "Väga tubli! Sul on tarbijahinnaindeksist ja selle muutustest selge pilt ees.";
    if (percentage >= 50) return "Hea algus! Tunned põhitõdesid, kuid mõned detailid vajavad veel üle vaatamist.";
    return "Sinu teekond arvude maailmas on alanud! Kui soovid oma teadmisi täiendada, siis Statistikaameti andmebaasid pakuvad palju avastamisrõõmu.";
  };

  // Header component with logo and title
  const Header = ({ title }: { title: string }) => (
    <div className="header-wrapper">
      <div className="official-black-bar"></div>
      <header className="app-header">
        <div className="header-content">
          <div className="logo-mask">
            <img src="/ES_Logo.svg" alt="Statistikaamet" className="stat-logo" />
          </div>
          <div className="header-divider"></div>
          <div className="text-mask">
            <h1 className="header-title">{title}</h1>
          </div>
        </div>
      </header>
    </div>
  );

  // Display final results page
  if (isFinished) {
    return (
      <div className="app-wrapper">
        <Header title="Tulemused" />
        <main className="container">
          <div className="results-summary">
            <p className="score-display">{score} / {questions.length}</p>
            <p className="personalized-message">
              {getFeedbackMessage(score, questions.length)}
            </p>
          </div>

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
                    {res.isCorrect ? "✓ Õige" : "✕ Vale"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="retry-btn" style={{ marginTop: '40px' }} onClick={() => window.location.reload()}>
            Proovi uuesti
          </button>
        </main>
      </div>
    );
  }

  // Display quiz questions
  return (
    <div className="app-wrapper">
      <Header title="Viktoriin" />
      <main className="container">
        <span className="step-indicator">KÜSIMUS {currentStep + 1} / {questions.length}</span>
        <h2>{questions[currentStep].questionText}</h2>
        <div className="options-list">
          {shuffledOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleAnswer(option.id, option.text)}
              disabled={!!feedback}
            >
              {option.text}
            </button>
          ))}
        </div>

        {/* Feedback for selected answer */}
        {feedback && (
          <div className={`feedback-alert ${feedback === 'Õige vastus!' ? 'correct' : 'wrong'}`}>
            {feedback}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;