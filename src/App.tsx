import { useState, useMemo } from 'react';
import { questions } from './quizData';
import { UserResult } from './types';
import './App.css';

const App = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [results, setResults] = useState<UserResult[]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Shuffle options using Fisher-Yates algorithm whenever the question changes
  const shuffledOptions = useMemo(() => {
    const options = [...questions[currentStep].options];
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
  }, [currentStep]);

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

  if (isFinished) {
    return (
      <div className="container">
        <h1>Tulemused</h1>
        <p className="score-text">{score} / {questions.length}</p>
        <table>
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
                <td className={res.isCorrect ? "text-success" : "text-error"}>
                  {res.isCorrect ? "Õige" : "Vale"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="retry-btn" onClick={() => window.location.reload()}>Proovi uuesti</button>
      </div>
    );
  }

  return (
    <>
      <header className="app-header">
        <div className="logo">
          {/* Row 1: Only dots */}
          <div className="dot"></div><div className="dot"></div><div className="dot"></div>
          <div></div>

          {/* Row 2: Middle dots, aligned with the top of "EESTI" */}
          <div className="dot"></div><div className="dot"></div><div className="dot"></div>
          <div className="logo-text">
            <span>EESTI</span>
            <span>STATISTIKA</span>
          </div>

          {/* Row 3: Bottom dots, aligned with the bottom of "STATISTIKA" */}
          <div className="dot"></div><div className="dot"></div><div className="dot"></div>
        </div>
      </header>

      <div className="container">
        <span className="step-indicator">Küsimus {currentStep + 1} / {questions.length}</span>
        <h2>{questions[currentStep].questionText}</h2>
        <div className="options-list">
          {shuffledOptions.map((option) => (
            <button key={option.id} onClick={() => handleAnswer(option.id, option.text)} disabled={!!feedback}>
              {option.text}
            </button>
          ))}
        </div>
        {feedback && <div className={`feedback-alert ${feedback === 'Õige vastus!' ? 'correct' : 'wrong'}`}>{feedback}</div>}
      </div>
    </>
  );
};

export default App;