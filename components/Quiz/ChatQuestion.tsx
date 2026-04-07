'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Option {
  text: string;
  score: number;
}

interface ChatQuestionProps {
  question: string;
  options: Option[];
  onAnswer: (score: number) => void;
}

export default function ChatQuestion({ question, options, onAnswer }: ChatQuestionProps) {
  const [showMessage, setShowMessage] = useState(false);
  const [showTyping, setShowTyping] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowTyping(false);
      setShowMessage(true);
    }, 700);
    const timer2 = setTimeout(() => setShowOptions(true), 1100);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleSelect = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    setTimeout(() => onAnswer(options[index].score), 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-4"
    >
      {/* Chat container */}
      <div className="bg-[#9bbbd4]/20 rounded-2xl p-4 min-h-[300px] space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2 pb-3 border-b border-gray-700/50">
          <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-sm">
            💪
          </div>
          <span className="text-white text-sm font-medium">산책 메이트</span>
        </div>

        {/* Typing indicator */}
        <AnimatePresence>
          {showTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-end gap-2"
            >
              <div className="bg-gray-700 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Friend's message */}
        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-end gap-2"
            >
              <div className="bg-gray-700 rounded-2xl rounded-bl-md px-4 py-3 max-w-[80%]">
                <p className="text-white text-sm">{question}</p>
              </div>
              <span className="text-gray-600 text-xs">오후 11:42</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* My response */}
        <AnimatePresence>
          {selected !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-end justify-end gap-2"
            >
              <span className="text-gray-600 text-xs">오후 11:43</span>
              <div className="bg-[#FEE500] rounded-2xl rounded-br-md px-4 py-3 max-w-[80%]">
                <p className="text-black text-sm">{options[selected].text}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Options */}
      <AnimatePresence>
        {showOptions && selected === null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-2"
          >
            {options.map((option, index) => (
              <motion.button
                key={index}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSelect(index)}
                className="w-full p-3 rounded-xl border border-gray-700 bg-gray-800/50 hover:border-gray-500 text-left text-sm text-gray-200 transition-all"
              >
                {option.text}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
