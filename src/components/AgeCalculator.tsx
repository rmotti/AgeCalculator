import React, { useState } from 'react';
import Button from './button';
import InputField from './InputField';
import ResultDisplay from './ResultDisplay';
import './AgeCalculator.css';

const AgeCalculator: React.FC = () => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [errors, setErrors] = useState({ day: '', month: '', year: '' });
  const [result, setResult] = useState({ years: 0, months: 0, days: 0 });

  const validateInputs = () => {
    let valid = true;
    const newErrors = { day: '', month: '', year: '' };

    // Validação do dia
    if (!day) {
      newErrors.day = 'This field is required';
      valid = false;
    } else if (isNaN(Number(day))) {
      newErrors.day = 'Must be a number';
      valid = false;
    } else if (Number(day) < 1 || Number(day) > 31) {
      newErrors.day = 'Must be a valid day';
      valid = false;
    }

    // Validação do mês
    if (!month) {
      newErrors.month = 'This field is required';
      valid = false;
    } else if (isNaN(Number(month))) {
      newErrors.month = 'Must be a number';
      valid = false;
    } else if (Number(month) < 1 || Number(month) > 12) {
      newErrors.month = 'Must be a valid month';
      valid = false;
    }

    // Validação do ano
    if (!year) {
      newErrors.year = 'This field is required';
      valid = false;
    } else if (isNaN(Number(year))) {
      newErrors.year = 'Must be a number';
      valid = false;
    } else if (Number(year) > new Date().getFullYear()) {
      newErrors.year = 'Must be in the past';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const calculateAge = () => {
    if (!validateInputs()) return;

    const birthDate = new Date(`${year}-${month}-${day}`);
    const today = new Date();
    
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setResult({ years, months, days });
  };

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