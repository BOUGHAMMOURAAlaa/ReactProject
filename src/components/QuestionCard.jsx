import React from 'react';

const QuestionCard = ({ question, options, onAnswerClick, selectedAnswer }) => {
    const getOptionClass = (option) => {
        if (!selectedAnswer) return '';

        if (option === question.answer) {
            return 'correct';
        }

        if (option === selectedAnswer && option !== question.answer) {
            return 'wrong';
        }

        return '';
    };

    return (
        <div className="question-card">
            <div className="category-badge">{question.category}</div>
            <h2 className="question-text">{question.question}</h2>
            <div className="options-container">
                {options.map((option, index) => (
                    <button
                        key={index}
                        className={`option-btn ${getOptionClass(option)}`}
                        onClick={() => onAnswerClick(option)}
                        disabled={!!selectedAnswer}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuestionCard;
