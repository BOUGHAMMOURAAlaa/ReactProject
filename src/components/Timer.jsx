import React from 'react';

const Timer = ({ timeLeft }) => {
    return (
        <div className="timer">
            Time: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>
    );
};

export default Timer;
