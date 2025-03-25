import React from 'react';
import './InputField.css';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  maxLength?: number;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, error }) => {
  return (
    <div className={`input-field ${error ? 'error' : ''}`}>
      <label>{label}</label>
      <input 
        type="text" 
        value={value} 
        onChange={onChange}
        placeholder={label === 'DAY' ? 'DD' : label === 'MONTH' ? 'MM' : 'YYYY'}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default InputField;