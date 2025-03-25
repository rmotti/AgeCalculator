import React from 'react';
import Button from './button';
import InputField from './InputField';
import ResultDisplay from './ResultDisplay';
import useAgeCalculator from '../hooks/useAgeCalculator';
import './AgeCalculator.css';

const AgeCalculator: React.FC = () => {
  const {
    day,
    month,
    year,
    errors,
    result,
    setDay,
    setMonth,
    setYear,
    calculateAge,
  } = useAgeCalculator();

  return (
    <div className="age-calculator">
      <div className="input-fields">
        <InputField 
          label="DAY" 
          value={day} 
          onChange={(e) => setDay(e.target.value.replace(/\D/g, ''))} 
          error={errors.day}
          maxLength={2}
        />
        <InputField 
          label="MONTH" 
          value={month} 
          onChange={(e) => setMonth(e.target.value.replace(/\D/g, ''))} 
          error={errors.month}
          maxLength={2}
        />
        <InputField 
          label="YEAR" 
          value={year} 
          onChange={(e) => setYear(e.target.value.replace(/\D/g, ''))} 
          error={errors.year}
          maxLength={4}
        />
        <div className="button-container">
          <Button onClick={calculateAge} />
        </div>
      </div>
      <ResultDisplay years={result.years} months={result.months} days={result.days} />
    </div>
  );
};

export default AgeCalculator;