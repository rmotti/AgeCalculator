import { useState } from 'react';

//Interface do resultado
interface AgeResult {
  years: number;
  months: number;
  days: number;
}
//Interface dos erros de input
interface InputErrors {
  day: string;
  month: string;
  year: string;
}
// Hook para calcular a idade
// O hook é responsável por gerenciar o estado dos inputs, validar os dados e calcular a idade
const useAgeCalculator = () => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [errors, setErrors] = useState<InputErrors>({ day: '', month: '', year: '' });
  const [result, setResult] = useState<AgeResult | null>(null); // Mudado para null inicial

// Função para validar se a data é válida
  // Verifica se a data é válida considerando o mês e o ano
  const isValidDate = (d: number, m: number, y: number): boolean => {
    // Ajuste para meses (0-11 no JavaScript)
    const date = new Date(y, m - 1, d);
    return (
      date.getFullYear() === y &&
      date.getMonth() === m - 1 &&
      date.getDate() === d
    );
  };
// Função para validar os inputs
  // Valida os inputs e retorna um booleano indicando se os dados são válidos
  const validateInputs = (): boolean => {
    const newErrors: InputErrors = { day: '', month: '', year: '' };
    let isValid = true;

    // Validação básica de preenchimento
    // Verifica se os campos estão preenchidos e se são números válidos
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
// Validação avançada
    // Verifica se os valores são números válidos
    const dayNum = parseInt(day);
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);

    // Validação avançada
    //quando o dia é maior que 31 ou menor que 1
    if (dayNum < 1 || dayNum > 31) {
      newErrors.day = 'Must be a valid day';
      isValid = false;
    }
// Valida se o mês é válido (1-12)
    if (monthNum < 1 || monthNum > 12) {
      newErrors.month = 'Must be a valid month';
      isValid = false;
    }
// Valida se o ano é válido (não pode ser maior que o ano atual)
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
// Função para calcular a idade
  // Calcula a idade com base na data de nascimento e atualiza o estado do resultado
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
// Função para limpar os inputs
  // Limpa os inputs e o resultado
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
// Hook para calcular a idade
// O hook é responsável por gerenciar o estado dos inputs, validar os dados e calcular a idade
export default useAgeCalculator;