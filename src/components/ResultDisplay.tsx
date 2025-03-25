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
      <div>{years} years</div>
      <div>{months} months</div>
      <div>{days} days</div>
    </div>
  );
};

export default ResultDisplay;