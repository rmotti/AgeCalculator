import React from 'react';
import './Button.css';

interface ButtonProps {
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      Calculate
    </button>
  );
};

export default Button;