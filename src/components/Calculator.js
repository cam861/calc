import React, { useState } from 'react';
import Display from './Display';
import Button from './Button';
import './Calculator.css';

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const inputNumber = (num) => {
    if (waitingForNewValue) {
      setDisplayValue(String(num));
      setWaitingForNewValue(false);
    } else {
      setDisplayValue(displayValue === '0' ? String(num) : displayValue + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplayValue('0.');
      setWaitingForNewValue(false);
    } else if (displayValue.indexOf('.') === -1) {
      setDisplayValue(displayValue + '.');
    }
  };

  const clear = () => {
    setDisplayValue('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const toggleSign = () => {
    setDisplayValue(String(parseFloat(displayValue) * -1));
  };

  const percentage = () => {
    setDisplayValue(String(parseFloat(displayValue) / 100));
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(displayValue);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplayValue(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const buttons = [
    { value: displayValue === '0' ? 'AC' : 'C', type: 'function', handler: clear },
    { value: '+/-', type: 'function', handler: toggleSign },
    { value: '%', type: 'function', handler: percentage },
    { value: '÷', type: 'operator', handler: () => performOperation('÷') },
    { value: '7', type: 'number', handler: () => inputNumber(7) },
    { value: '8', type: 'number', handler: () => inputNumber(8) },
    { value: '9', type: 'number', handler: () => inputNumber(9) },
    { value: '×', type: 'operator', handler: () => performOperation('×') },
    { value: '4', type: 'number', handler: () => inputNumber(4) },
    { value: '5', type: 'number', handler: () => inputNumber(5) },
    { value: '6', type: 'number', handler: () => inputNumber(6) },
    { value: '-', type: 'operator', handler: () => performOperation('-') },
    { value: '1', type: 'number', handler: () => inputNumber(1) },
    { value: '2', type: 'number', handler: () => inputNumber(2) },
    { value: '3', type: 'number', handler: () => inputNumber(3) },
    { value: '+', type: 'operator', handler: () => performOperation('+') },
    { value: '0', type: 'number', wide: true, handler: () => inputNumber(0) },
    { value: '.', type: 'number', handler: inputDecimal },
    { value: '=', type: 'operator', handler: () => performOperation('=') },
  ];

  return (
    <div className="calculator">
      <Display value={displayValue} />
      <div className="buttons">
        {buttons.map((button, index) => (
          <Button
            key={index}
            value={button.value}
            type={button.type}
            wide={button.wide}
            onClick={button.handler}
          />
        ))}
      </div>
    </div>
  );
};

export default Calculator;