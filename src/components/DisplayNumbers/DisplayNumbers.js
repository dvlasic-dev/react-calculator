import React, { useState, useRef, useLayoutEffect } from 'react';

const DisplayNumbers = props => {
  const [scale, changeScale] = useState(1);
  const el = useRef();
  const language = navigator.language || 'en-US';

  useLayoutEffect(() => {
    const node = el.current;
    const parentNode = node.parentNode;

    const availableWidth = parentNode.offsetWidth;
    const actualWidth = node.offsetWidth;
    const actualScale = availableWidth / actualWidth;
    if (scale === actualScale) return;

    if (actualScale < 1) {
      changeScale(actualScale - 0.05043);
    } else if (scale < 1) {
      changeScale(1);
    }
  });
  let fixValue = parseFloat(props.value).toLocaleString(language, {
    useGrouping: true,
    maximumFractionDigits: 6
  });
  const match = props.value.toString().match(/\.\d*?(0*)$/);
  if (match) fixValue += /[1-9]/.test(match[0]) ? match[1] : match[0];

  return (
    <p ref={el} style={{ transform: `scale(${scale},${scale})` }}>
      {fixValue}
      {/* props.operator ? props.operator : null */}
    </p>
  );
};
export default DisplayNumbers;
