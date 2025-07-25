import React from 'react';
import './Button.css';

const Button = ({ value, type, wide, onClick }) => {
  const className = `button ${type} ${wide ? 'wide' : ''}`;

  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  );
};

export default Button;