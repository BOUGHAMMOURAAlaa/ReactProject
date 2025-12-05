import React, { useState, useEffect, useContext } from 'react';
import QuestionCard from './QuestionCard';
import Result from './Result';
import { questions } from '../data/questions';
import { ThemeContext } from './ThemeContext';

const Quiz = () => {
    const { theme } = useContext(ThemeContext);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [timeLeft, setTimeLeft] = useState(300);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredQuestions = selectedCategory === 'All' ? questions : questions.filter(q => q.category === selectedCategory);

    useEffect(() => {
        if (timeLeft > 0 && !showResult) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && !showResult) {
            setShowResult(true);
        }
    }, [timeLeft, showResult]);

    const handleAnswerClick = (selectedOption) => {
        setSelectedAnswer(selectedOption);

        const isCorrect = selectedOption === filteredQuestions[currentQuestionIndex].answer;
        if (isCorrect) {
            setScore(prevScore => prevScore + 1);
        }

        // Wait a moment before moving to next question to show selection
        setTimeout(() => {
            const nextQuestion = currentQuestionIndex + 1;
            if (nextQuestion < filteredQuestions.length) {
                setCurrentQuestionIndex(nextQuestion);
                setSelectedAnswer(null);
            } else {
                setShowResult(true);
            }
        }, 800);
    };

    const handleRestart = () => {
        setScore(0);
        setCurrentQuestionIndex(0);
        setShowResult(false);
        setSelectedAnswer(null);
        setTimeLeft(300);
        setSelectedCategory('All');
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentQuestionIndex(0);
        setScore(0);
        setSelectedAnswer(null);
        setTimeLeft(300);
        setShowResult(false);
    };

    const progress = ((currentQuestionIndex + 1) / filteredQuestions.length) * 100;

    return (
        <div className="quiz-container">
            {!showResult ? (
                <>
                    <div className="quiz-header">
                        <span>Question {currentQuestionIndex + 1}/{filteredQuestions.length}</span>
                        <span>Score: {score}</span>
                        <span>Time: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
                    </div>
                    <div className="progress-bar-container">
                        <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                    </div>
                    <div className="category-selector">
                        <select value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
                            <option value="All">All Categories</option>
                            <option value="React">React</option>
                            <option value="CSS">CSS</option>
                            <option value="HTML/JS">HTML/JS</option>
                            <option value="Vue.js">Vue.js</option>
                        </select>
                    </div>
                    <QuestionCard
                        question={filteredQuestions[currentQuestionIndex]}
                        options={filteredQuestions[currentQuestionIndex].options}
                        onAnswerClick={handleAnswerClick}
                        selectedAnswer={selectedAnswer}
                    />
                </>
            ) : (
                <Result
                    score={score}
                    totalQuestions={filteredQuestions.length}
                    onRestart={handleRestart}
                />
            )}
        </div>
    );
};

export default Quiz;
