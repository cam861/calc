import React from 'react';
import './Display.css';

interface DisplayProps {
  value: string;
}

const Display: React.FC<DisplayProps> = ({ value }) => {
  const formattedValue = parseFloat(value).toLocaleString('en-US', {
    maximumFractionDigits: 9,
    useGrouping: true
  });

  const fontSize = formattedValue.length > 7 ? '60px' : '80px';

  return (
    <div className="display" style={{ fontSize }}>
      {value}
    </div>
  );
};

export default Display;