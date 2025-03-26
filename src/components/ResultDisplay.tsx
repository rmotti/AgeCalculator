import React from 'react';
import './ResultDisplay.css';

interface ResultDisplayProps {
  years: number | null;
  months: number | null;
  days: number | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ years, months, days }) => {
  return (
    <div className="result-display">
      <div className="result-item">
        <span>{years !== null ? years : '--'}</span> {years === 1 ? 'year' : 'years'}
      </div>
      <div className="result-item">
        <span>{months !== null ? months : '--'}</span> {months === 1 ? 'month' : 'months'}
      </div>
      <div className="result-item">
        <span>{days !== null ? days : '--'}</span> {days === 1 ? 'day' : 'days'}
      </div>
    </div>
  );
};

export default ResultDisplay;