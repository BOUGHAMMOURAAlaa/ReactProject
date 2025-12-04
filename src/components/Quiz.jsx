import React, { useState } from 'react';
import QuestionCard from './QuestionCard';
import Result from './Result';
import { questions } from '../data/questions';

const Quiz = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const handleAnswerClick = (selectedOption) => {
        setSelectedAnswer(selectedOption);

        const isCorrect = selectedOption === questions[currentQuestionIndex].answer;
        if (isCorrect) {
            setScore(prevScore => prevScore + 1);
        }

        // Wait a moment before moving to next question to show selection
        setTimeout(() => {
            const nextQuestion = currentQuestionIndex + 1;
            if (nextQuestion < questions.length) {
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
    };

    return (
        <div className="quiz-container">
            {!showResult ? (
                <>
                    <div className="quiz-header">
                        <span>Question {currentQuestionIndex + 1}/{questions.length}</span>
                        <span>Score: {score}</span>
                    </div>
                    <QuestionCard
                        question={questions[currentQuestionIndex]}
                        options={questions[currentQuestionIndex].options}
                        onAnswerClick={handleAnswerClick}
                        selectedAnswer={selectedAnswer}
                    />
                </>
            ) : (
                <Result
                    score={score}
                    totalQuestions={questions.length}
                    onRestart={handleRestart}
                />
            )}
        </div>
    );
};

export default Quiz;
