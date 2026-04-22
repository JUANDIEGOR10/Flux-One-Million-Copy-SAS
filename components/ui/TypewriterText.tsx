'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
}

export default function TypewriterText({ text, speed = 15, delay = 0 }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const startTyping = () => {
      let currentIdx = 0;
      const intervalId = setInterval(() => {
        if (currentIdx <= text.length) {
          setDisplayedText(text.slice(0, currentIdx));
          currentIdx++;
        } else {
          clearInterval(intervalId);
        }
      }, speed);
      return intervalId;
    };

    const initialDelay = setTimeout(() => {
      const intervalId = startTyping();
      return () => clearInterval(intervalId);
    }, delay);

    return () => {
      clearTimeout(initialDelay);
    };
  }, [text, speed, delay]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="whitespace-pre-wrap leading-relaxed"
    >
      {displayedText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="ml-0.5 inline-block h-4 w-1.5 bg-primary"
      />
    </motion.div>
  );
}
