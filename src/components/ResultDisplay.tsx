import React from 'react';
import './ResultDisplay.css';

interface ResultDisplayProps {
  years: number;
  months: number;
  days: number;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ years, months, days }) => {
  return (
    <div className="result-display">
      <div className="result-item">
        <span>{years}</span> {years === 1 ? 'year' : 'years'}
      </div>
      <div className="result-item">
        <span>{months}</span> {months === 1 ? 'month' : 'months'}
      </div>
      <div className="result-item">
        <span>{days}</span> {days === 1 ? 'day' : 'days'}
      </div>
    </div>
  );
};

export default ResultDisplay;