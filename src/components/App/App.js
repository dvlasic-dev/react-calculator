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
  max-width: 600px;
  width: 100%;

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
  p {
    align-self: flex-end;
  }
`;
function App() {
  const [input, setInput] = useState(0);
  const [display, setDisplay] = useState(0);
  const [operation, setOperation] = useState(null);

  const handleKeyDown = e => {
    let { key } = e;

    if (/^[0-9]*$/.test(key)) {
      e.preventDefault();
      setInput(String(input + parseInt(key, 10)));
    }
    if (key === 'Backspace') {
      setInput(
        input.length === 1 ? 0 : String(input.slice(0, input.length - 1))
      );
    }
    if (key === 'c') {
      setDisplay(0);
      setInput(0);
      setOperation(null);
    }
    if (key === 'Enter') {
      setOperation(null);
      if (input !== 0 && operation !== null) {
        setInput(0);
        setDisplay(operators[operation.trim()](input, display));
      }
    }
    const operators = {
      '+': (input, display) => Number(display) + Number(input),
      '*': (input, display) => display * input,
      '-': (input, display) => display - input,
      '/': (input, display) => display / input
    };
    if (key in operators) {
      setOperation(` ${key} `);
      setInput(0);
      if (input === 0 /* && ` ${key} ` === operation */) {
        setDisplay(operators[key](display, display));
      } else {
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
  return (
    <Wrapper>
      <Container>
        <Display>
          <p>
            {display}
            {operation}
          </p>
          <p>{input}</p>
        </Display>
      </Container>
    </Wrapper>
  );
}

export default App;
