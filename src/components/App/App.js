import React, { useEffect, useState } from 'react';
import Backspace from './Backspace';
import styled from 'styled-components';
import { buttons } from '../../constants/';

const Wrapper = styled.div`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  display: flex;
  background: linear-gradient(
    180deg,
    rgba(37, 36, 55, 1) 0%,
    rgba(49, 48, 66, 1) 31%,
    rgba(58, 58, 75, 1) 58%,
    rgba(67, 74, 83, 1) 95%
  );
`;
const Container = styled.section`
  display: flex;
  max-width: 325px;
  width: 100%;
  flex-direction: column;
  margin: 100px auto;
  border: 3px solid #57606f;
`;
const Display = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  width: 100%;
  justify-content: flex-end;
  margin-bottom: 50px;
  padding: 10px 10px 20px 10px;
  overflow: hidden;
  p {
    align-self: flex-end;
  }
  p:nth-child(1) {
    font-size: 30px;
  }
  p:nth-child(2) {
    font-size: 20px;
  }
`;
const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 300px;
  align-self: center;
  margin-bottom: 5px;
  div:nth-child(17) {
    flex-basis: 50%;
    max-width: 200px;
  }
`;
const Item = styled.div`
  display: flex;
  flex-basis: 25%;
  max-width: 75px;
  width: 100%;
  height: 70px;

  button {
    background: 0;
    border: 0;
    outline: 0;
    width: 100%;
    font-size: 25px;
    position: relative;
    background: radial-gradient(
      circle,
      rgba(176, 176, 176, 1) 0%,
      rgba(218, 218, 218, 1) 100%
    );

    border: 2px solid #353b48;
    &:active {
      top: 1px;
    }
    &:hover {
      opacity: 0.9;
    }
    svg {
      display: flex;
      margin: auto;
    }
  }
`;

function App() {
  const [input, setInput] = useState(0);
  const [display, setDisplay] = useState(0);
  const [operation, setOperation] = useState(null);

  const handleKeyDownAndClick = (e, item) => {
    let { key } = e;
    const value = item ? item : key;
    const operators = {
      '+': (input, display) => Number(display) + Number(input),
      '*': (input, display) => display * input,
      '-': (input, display) => display - input,
      '/': (input, display) => display / input
    };

    if (/^[0-9]*$/.test(value)) {
      e.preventDefault();
      setInput(String(input + parseInt(value, 10)));
    }
    if (value === 'Backspace' || value === '<=') {
      e.preventDefault();
      setInput(
        input.length === 1 || input === 0
          ? 0
          : String(input.slice(0, input.length - 1))
      );
    }
    if (value === 'c' || value === 'C') {
      setDisplay(0);
      setInput(0);
      setOperation(null);
    }
    if (value === 'Enter' || value === '=') {
      e.preventDefault();
      if (input !== 0 && operation !== null) {
        setInput(0);
        setDisplay(operators[operation.trim()](input, display));
      }
    }
    if (value === '.') {
      if (!/\./.test(input)) {
        setInput(input + '.');
      }
    }
    if (value === '+/-') {
      setDisplay('-1' * display);
    }

    if (value in operators) {
      setOperation(` ${value} `);
      setInput(0);
      if (input === 0 && ` ${value} ` === operation) {
        setDisplay(operators[value](display, display));
      } else if (input !== 0) {
        setDisplay(
          display === 0 ? Number(input) : operators[value](input, display)
        );
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDownAndClick);
    return () => {
      document.removeEventListener('keydown', handleKeyDownAndClick);
    };
  });
  const language = navigator.language || 'en-US';
  return (
    <Wrapper>
      <Container>
        <Display>
          <p>
            {/* display.toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ') */}
            {parseFloat(display).toLocaleString(language, {
              useGrouping: true,
              maximumFractionDigits: 6
            })}
            {operation}
          </p>
          <p>
            {/* input.toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ') */}
            {parseFloat(input).toLocaleString(language, {
              useGrouping: true,
              maximumFractionDigits: 6
            })}
          </p>
        </Display>
        <ButtonsContainer>
          {buttons.map(item => {
            return (
              <Item key={item}>
                <button onClick={e => handleKeyDownAndClick(e, item)}>
                  {item === '<=' ? <Backspace /> : item === '*' ? 'X' : item}
                </button>
              </Item>
            );
          })}
        </ButtonsContainer>
      </Container>
    </Wrapper>
  );
}

export default App;
