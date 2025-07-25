import React from 'react';
import './Button.css';

interface ButtonProps {
  value: string;
  type: 'function' | 'operator' | 'number';
  wide?: boolean;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ value, type, wide, onClick }) => {
  const className = `button ${type} ${wide ? 'wide' : ''}`;

  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  );
};

export default Button;