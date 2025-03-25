import React, { useState } from 'react';
import Button from './button.tsx';
import InputField from './InputField';
import ResultDisplay from './ResultDisplay';
import './AgeCalculator.css';

const AgeCalculator: React.FC = () => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [result, setResult] = useState({ years: 0, months: 0, days: 0 });

  const calculateAge = () => {
    const birthDate = new Date(`${year}-${month}-${day}`);
    const today = new Date();
    const ageInMilliseconds = today.getTime() - birthDate.getTime();
    const ageDate = new Date(ageInMilliseconds);
    const years = ageDate.getUTCFullYear() - 1970;
    const months = ageDate.getUTCMonth();
    const days = ageDate.getUTCDate() - 1;
    setResult({ years, months, days });
  };

  return (
    <div className="agc-calculator">
      <InputField label="DAY" value={day} onChange={(e) => setDay(e.target.value)} />
      <InputField label="MONTH" value={month} onChange={(e) => setMonth(e.target.value)} />
      <InputField label="YEAR" value={year} onChange={(e) => setYear(e.target.value)} />
      <Button onClick={calculateAge} />
      <ResultDisplay years={result.years} months={result.months} days={result.days} />
    </div>
  );
};

export default AgeCalculator;