'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Option {
  text: string;
  emoji?: string;
  score: number;
}

interface ImageSelectQuestionProps {
  question: string;
  options: Option[];
  onAnswer: (score: number) => void;
}

export default function ImageSelectQuestion({
  question,
  options,
  onAnswer,
}: ImageSelectQuestionProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    setTimeout(() => onAnswer(options[index].score), 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <h2 className="text-xl font-bold text-white text-center leading-relaxed">
        {question}
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {options.map((option, index) => (
          <motion.button
            key={index}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelect(index)}
            className={`
              p-4 rounded-2xl border-2 transition-all text-left
              ${
                selected === index
                  ? 'border-white bg-white/10'
                  : 'border-gray-700 bg-gray-800/50 hover:border-gray-500'
              }
              ${selected !== null && selected !== index ? 'opacity-40' : ''}
            `}
          >
            <div className="text-3xl mb-2">{option.emoji}</div>
            <div className="text-sm text-gray-200 font-medium leading-snug">
              {option.text}
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
