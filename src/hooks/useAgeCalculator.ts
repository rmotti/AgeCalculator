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
  const [result, setResult] = useState<AgeResult | null>(null); // Mudado para null inicial


  const isValidDate = (d: number, m: number, y: number): boolean => {
    // Ajuste para meses (0-11 no JavaScript)
    const date = new Date(y, m - 1, d);
    return (
      date.getFullYear() === y &&
      date.getMonth() === m - 1 &&
      date.getDate() === d
    );
  };

  const validateInputs = (): boolean => {
    const newErrors: InputErrors = { day: '', month: '', year: '' };
    let isValid = true;

    // Validação básica de preenchimento
    if (!day) {
      newErrors.day = 'This field is required';
      isValid = false;
    } else if (isNaN(Number(day)) || !/^\d+$/.test(day)) {
      newErrors.day = 'Must be a valid number';
      isValid = false;
    }

    if (!month) {
      newErrors.month = 'This field is required';
      isValid = false;
    } else if (isNaN(Number(month)) || !/^\d+$/.test(month)) {
      newErrors.month = 'Must be a valid number';
      isValid = false;
    }

    if (!year) {
      newErrors.year = 'This field is required';
      isValid = false;
    } else if (isNaN(Number(year)) || !/^\d+$/.test(year)) {
      newErrors.year = 'Must be a valid number';
      isValid = false;
    }

    // Se já tem erro básico, não valida o resto
    if (!isValid) {
      setErrors(newErrors);
      return false;
    }

    const dayNum = parseInt(day);
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);

    // Validação avançada
    if (dayNum < 1 || dayNum > 31) {
      newErrors.day = 'Must be a valid day';
      isValid = false;
    }

    if (monthNum < 1 || monthNum > 12) {
      newErrors.month = 'Must be a valid month';
      isValid = false;
    }

    const currentYear = new Date().getFullYear();
    if (yearNum > currentYear) {
      newErrors.year = 'Must be in the past';
      isValid = false;
    }

    // Valida se a data existe (ex: 31/04 ou 29/02 em anos não bissextos)
    if (isValid && !isValidDate(dayNum, monthNum, yearNum)) {
      newErrors.day = 'Invalid date';
      isValid = false;
    }

    // Valida se a data é no futuro
    if (isValid) {
      const inputDate = new Date(yearNum, monthNum - 1, dayNum);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Remove hora para comparar só a data

      if (inputDate > today) {
        newErrors.day = 'Date must be in the past';
        newErrors.month = '';
        newErrors.year = '';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const calculateAge = () => {
    if (!validateInputs()) return;

    const birthDate = new Date(
      parseInt(year),
      parseInt(month) - 1, // Meses são 0-indexed
      parseInt(day)
    );
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    // Ajuste para dias negativos
    if (days < 0) {
      months--;
      // Dias no mês anterior
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