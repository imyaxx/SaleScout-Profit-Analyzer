import React, { useEffect, useRef, useState } from 'react';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  format?: (val: number) => string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, duration = 800, format }) => {
  const [display, setDisplay] = useState(0);
  const prev = useRef(0);

  useEffect(() => {
    const start = prev.current;
    const end = value;
    const diff = end - start;
    if (diff === 0) return;

    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const current = Math.round(start + diff * progress);
      setDisplay(current);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
    prev.current = value;
  }, [value, duration]);

  return <span>{format ? format(display) : display.toString()}</span>;
};

export default AnimatedNumber;
