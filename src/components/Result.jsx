import React from 'react';

const Result = ({ score, totalQuestions, onRestart }) => {
    const percentage = (score / totalQuestions) * 100;
    let message = '';
    let emoji = '';

    if (percentage === 100) {
        message = 'Perfect Score!';
        emoji = '🏆';
    } else if (percentage >= 80) {
        message = 'Great Job!';
        emoji = '🎉';
    } else if (percentage >= 50) {
        message = 'Good Effort!';
        emoji = '👍';
    } else {
        message = 'Keep Learning!';
        emoji = '📚';
    }

    return (
        <div className="result-card">
            <div className="emoji-display">{emoji}</div>
            <h2>{message}</h2>
            <p className="score-text">
                You scored <span className="highlight">{score}</span> out of <span className="highlight">{totalQuestions}</span>
            </p>
            <div className="progress-bar-container">
                <div
                    className="progress-bar-fill"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
            <button className="restart-btn" onClick={onRestart}>
                Play Again
            </button>
        </div>
    );
};

export default Result;
