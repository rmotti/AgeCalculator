import React from 'react';
import './Button.css';
import arrowIcon from '../assets/images/icon-arrow.svg';

interface ButtonProps {
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      <img src={arrowIcon} alt="Arrow Icon" />
    </button>
  );
};

export default Button;