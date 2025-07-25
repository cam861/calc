import React, { useState, useEffect } from 'react';
import Display from './Display';
import Button from './Button';
import './Calculator.css';

type OperationType = '+' | '-' | '×' | '÷' | '=' | null;

interface ButtonConfig {
  value: string;
  type: 'function' | 'operator' | 'number';
  wide?: boolean;
  handler: () => void;
}

const Calculator: React.FC = () => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<OperationType>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState<boolean>(false);

  const inputNumber = (num: number): void => {
    if (waitingForNewValue) {
      setDisplayValue(String(num));
      setWaitingForNewValue(false);
    } else {
      setDisplayValue(displayValue === '0' ? String(num) : displayValue + num);
    }
  };

  const inputDecimal = (): void => {
    if (waitingForNewValue) {
      setDisplayValue('0.');
      setWaitingForNewValue(false);
    } else if (displayValue.indexOf('.') === -1) {
      setDisplayValue(displayValue + '.');
    }
  };

  const clear = (): void => {
    setDisplayValue('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const toggleSign = (): void => {
    setDisplayValue(String(parseFloat(displayValue) * -1));
  };

  const percentage = (): void => {
    setDisplayValue(String(parseFloat(displayValue) / 100));
  };

  const performOperation = (nextOperation: OperationType): void => {
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

  const calculate = (firstValue: number, secondValue: number, operation: OperationType): number => {
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      const { key } = event;
      
      if (key >= '0' && key <= '9') {
        inputNumber(parseInt(key));
      } else if (key === '.') {
        inputDecimal();
      } else if (key === '+') {
        performOperation('+');
      } else if (key === '-') {
        performOperation('-');
      } else if (key === '*') {
        performOperation('×');
      } else if (key === '/') {
        event.preventDefault();
        performOperation('÷');
      } else if (key === 'Enter' || key === '=') {
        performOperation('=');
      } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clear();
      } else if (key === '%') {
        percentage();
      } else if (key === 'Backspace') {
        if (displayValue.length > 1) {
          setDisplayValue(displayValue.slice(0, -1));
        } else {
          setDisplayValue('0');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [displayValue, inputNumber, inputDecimal, performOperation, clear, percentage]);

  const buttons: ButtonConfig[] = [
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