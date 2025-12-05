import React, { useContext, useState } from 'react'
import Quiz from './components/Quiz'
import { ThemeProvider, ThemeContext } from './components/ThemeContext'
import Button from './components/Button'

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

function AppContent() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [quizStarted, setQuizStarted] = useState(false);

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  return (
    <div className="app" data-theme={theme}>
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
      <h1 className="app-title">Dev Quiz Challenge</h1>
      {!quizStarted ? (
        <div className="start-screen">
          <p className="start-description">
            Test your knowledge of React, CSS, HTML/JS, and Vue.js!
          </p>
          <Button onClick={handleStartQuiz} className="start-quiz-btn">Start Quiz</Button>
        </div>
      ) : (
        <Quiz />
      )}
    </div>
  )
}

export default App
