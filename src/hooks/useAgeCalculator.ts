
import { useState } from 'react';

interface AgeResult {
  years: number;
  months: number;
  days: number;
}

interface InputErrors {
  day: string;
  month: string;
  year: string;
}

const useAgeCalculator = () => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [errors, setErrors] = useState<InputErrors>({ day: '', month: '', year: '' });
  const [result, setResult] = useState<AgeResult>({ years: 0, months: 0, days: 0 });

  const validateInputs = (): boolean => {
    const newErrors: InputErrors = { day: '', month: '', year: '' };
    let isValid = true;

    // Validação do dia
    if (!day) {
      newErrors.day = 'This field is required';
      isValid = false;
    } else if (isNaN(Number(day))) {
      newErrors.day = 'Must be a number';
      isValid = false;
    } else if (Number(day) < 1 || Number(day) > 31) {
      newErrors.day = 'Must be a valid day';
      isValid = false;
    }

    // Validação do mês
    if (!month) {
      newErrors.month = 'This field is required';
      isValid = false;
    } else if (isNaN(Number(month))) {
      newErrors.month = 'Must be a number';
      isValid = false;
    } else if (Number(month) < 1 || Number(month) > 12) {
      newErrors.month = 'Must be a valid month';
      isValid = false;
    }

    // Validação do ano
    if (!year) {
      newErrors.year = 'This field is required';
      isValid = false;
    } else if (isNaN(Number(year))) {
      newErrors.year = 'Must be a number';
      isValid = false;
    } else if (Number(year) > new Date().getFullYear()) {
      newErrors.year = 'Must be in the past';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const calculateAge = () => {
    if (!validateInputs()) return;

    const birthDate = new Date(`${year}-${month}-${day}`);
    const today = new Date();
    
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    // Ajuste para dias negativos
    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    // Ajuste para meses negativos
    if (months < 0) {
      years--;
      months += 12;
    }

    setResult({ years, months, days });
  };

  return {
    day,
    month,
    year,
    errors,
    result,
    setDay,
    setMonth,
    setYear,
    calculateAge,
  };
};

export default useAgeCalculator;