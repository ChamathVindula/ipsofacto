import React, { useEffect, useState, useRef } from 'react';

const ProgressBar = ({ duration, questionIndex, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const intervalRef = useRef(null);

  // Start or reset the timer whenever questionIndex changes
  useEffect(() => {
    setTimeLeft(duration);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 100) {
          clearInterval(intervalRef.current);
          if (onComplete) onComplete();     // Call back when time is up
          return 0;
        }
        return prev - 100;
      });
    }, 100);

    return () => clearInterval(intervalRef.current);
  }, [questionIndex, duration, onComplete]);

  const progress = (timeLeft / duration) * 100;

  return (
    <div className="flex justify-center items-center mt-4">
        <div className="relative w-[400px] h-6 bg-gray-200 rounded overflow-hidden my-3">
        <div
            className="h-full transition-all duration-100 ease-linear"
            style={{
            width: `${progress}%`,
            background: 'linear-gradient(to right, #AAFFA9, #11FFBD)'
            }}
        />
        <span className="absolute inset-0 flex items-center justify-center font-semibold text-gray-800 text-sm">
            {(timeLeft / 1000).toFixed(0)}s
        </span>
        </div>
    </div>
  );
};

export default ProgressBar;
