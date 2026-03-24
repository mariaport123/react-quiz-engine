import { useState, useMemo } from 'react';
import { questions } from './quizData';
import { UserResult } from './types';
import './App.css';

const App = () => {
  // Application state for tracking quiz progress and user performance
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [results, setResults] = useState<UserResult[]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  /**
   * Use useMemo to shuffle options only when the current step changes.
   * This prevents the buttons from re-shuffling when the feedback state updates.
   * Uses the Fisher-Yates algorithm for reliable randomization.
   */
  const shuffledOptions = useMemo(() => {
    const options = [...questions[currentStep].options];
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
  }, [currentStep]);

  /**
   * Logic to handle the user's answer selection.
   * Updates the score, saves the result, and manages transitions between questions.
   */
  const handleAnswer = (optionId: string, optionText: string) => {
    const currentQuestion = questions[currentStep];
    const isCorrect = optionId === currentQuestion.correctAnswerId;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    // Store the result for the final summary table
    const newResult: UserResult = {
      question: currentQuestion.questionText,
      userAnswer: optionText,
      isCorrect: isCorrect
    };

    setResults([...results, newResult]);

    // Provide immediate visual feedback to the user
    setFeedback(isCorrect ? "Õige vastus!" : "Vale vastus!");

    // Short delay to allow the user to read the feedback
    setTimeout(() => {
      setFeedback(null);
      const nextStep = currentStep + 1;

      if (nextStep < questions.length) {
        setCurrentStep(nextStep);
      } else {
        setIsFinished(true);
      }
    }, 1200);
  };

  /**
   * Returns a personalized message based on the final score percentage.
   */
  const getFinalMessage = (score: number) => {
    const total = questions.length;
    if (score === total) return "Suurepärane tulemus! Oled tõeline andmeekspert.";
    if (score >= total / 2) return "Tubli tulemus, enamik vastuseid on õiged!";
    return "Võimalusi arenguks on – uuri lähemalt Statistikaameti andmebaase.";
  };

  // Final Results View: Renders the score, feedback message, and detailed summary table
  if (isFinished) {
    return (
      <div className="container">
        <h1>Viktoriini tulemused</h1>
        <p className="score-text">Lõppskoor: {score} / {questions.length}</p>
        <p className="personalized-message">{getFinalMessage(score)}</p>

        <table>
          <thead>
            <tr>
              <th>Küsimus</th>
              <th>Sinu vastus</th>
              <th>Tulemus</th>
            </tr>
          </thead>
          <tbody>
            {results.map((res, index) => (
              <tr key={index}>
                <td>{res.question}</td>
                <td>{res.userAnswer}</td>
                <td className={res.isCorrect ? "text-success" : "text-error"}>
                  {res.isCorrect ? "Õige" : "Vale"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="retry-btn" onClick={() => window.location.reload()}>
          Proovi uuesti
        </button>
      </div>
    );
  }

  // Quiz Question View: Renders the active question and interactive answer options
  return (
    <div className="container">
      <div className="quiz-header">
        <span className="step-indicator">Küsimus {currentStep + 1} / {questions.length}</span>
      </div>

      <h2>{questions[currentStep].questionText}</h2>

      <div className="options-list">
        {shuffledOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => handleAnswer(option.id, option.text)}
            // Buttons are disabled while feedback is active to prevent multiple clicks
            disabled={!!feedback}
          >
            {option.text}
          </button>
        ))}
      </div>

      {/* Styled alert box for correct/incorrect answers */}
      {feedback && (
        <div className={`feedback-alert ${feedback === 'Õige vastus!' ? 'correct' : 'wrong'}`}>
          {feedback}
        </div>
      )}
    </div>
  );
};

export default App;