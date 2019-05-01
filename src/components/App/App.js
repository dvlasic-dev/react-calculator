import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

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
  max-width: 345px;
  width: 100%;
  flex-direction: column;
  margin: 100px auto;
  border: 3px solid grey;
  padding: 10px;
`;
const Display = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  width: 100%;
  justify-content: flex-end;
  margin-bottom: 20px;
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
  div:nth-child(17) {
    flex-basis: 50%;
    max-width: 200px;
  }
`;
const Item = styled.div`
  display: flex;
  max-width: 80px;
  flex-basis: 25%;
  width: 100%;
  height: 70px;

  button {
    width: 100%;
    font-size: 25px;
  }
`;
function App() {
  const [input, setInput] = useState(0);
  const [display, setDisplay] = useState(0);
  const [operation, setOperation] = useState(null);

  const handleKeyDown = e => {
    let { key } = e;
    const operators = {
      '+': (input, display) => Number(display) + Number(input),
      '*': (input, display) => display * input,
      '-': (input, display) => display - input,
      '/': (input, display) => display / input
    };

    if (/^[0-9]*$/.test(key)) {
      e.preventDefault();
      setInput(String(input + parseInt(key, 10)));
    }
    if (key === 'Backspace') {
      setInput(
        input.length === 1 || input === 0
          ? 0
          : String(input.slice(0, input.length - 1))
      );
    }
    if (key === 'c') {
      setDisplay(0);
      setInput(0);
      setOperation(null);
    }
    if (key === 'Enter') {
      if (input !== 0 && operation !== null) {
        setInput(0);
        setDisplay(operators[operation.trim()](input, display));
      }
    }

    if (key in operators) {
      setOperation(` ${key} `);
      setInput(0);
      if (input === 0 && ` ${key} ` === operation) {
        setDisplay(operators[key](display, display));
      } else if (input !== 0) {
        setDisplay(
          display === 0 ? Number(input) : operators[key](input, display)
        );
      }
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });
  const buttons = [
    'C',
    '<=',
    '+-',
    '/',
    '7',
    '8',
    '9',
    'X',
    '4',
    '5',
    '6',
    '-',
    '1',
    '2',
    '3',
    '+',
    '0',
    '.',
    '='
  ];
  return (
    <Wrapper>
      <Container>
        <Display>
          <p>
            {display.toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ')}
            {operation}
          </p>
          <p>
            {input.toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ')}
          </p>
        </Display>
        <ButtonsContainer>
          {buttons.map(item => {
            return (
              <Item key={item}>
                <button>{item}</button>
              </Item>
            );
          })}
        </ButtonsContainer>
      </Container>
    </Wrapper>
  );
}

export default App;
