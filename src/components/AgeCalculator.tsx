import React from 'react';
import Button from './Button';
import InputField from './InputField';
import ResultDisplay from './ResultDisplay';
import useAgeCalculator from '../hooks/useAgeCalculator';
import './AgeCalculator.css';

// uso do hook useAgeCalculator para calcular a idade
// O hook é responsável por gerenciar o estado dos inputs, validar os dados e calcular a idade
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

//estrutura do input
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
      
      <ResultDisplay 
        years={result?.years ?? null} 
        months={result?.months ?? null} 
        days={result?.days ?? null} 
      />
    </div>
  );
};

export default AgeCalculator;