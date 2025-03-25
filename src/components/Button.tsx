import React from 'react';
import './Button.css';

interface ButtonProps {
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      <img src="./assets/images/icon-arrow.svg" alt="Arrow Icon" />
    </button>
  );
};

export default Button;