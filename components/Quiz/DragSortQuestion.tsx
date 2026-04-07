'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { Question } from '@/data/questions';

interface DragSortQuestionProps {
  question: string;
  options: NonNullable<Question['options']>;
  onAnswer: (score: number) => void;
}

export default function DragSortQuestion({ question, options, onAnswer }: DragSortQuestionProps) {
  const [items, setItems] = useState(() =>
    options.map((option, index) => ({
      id: `${index}-${option.text}`,
      text: option.text,
      emoji: option.emoji ?? '',
    }))
  );
  const [confirmed, setConfirmed] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [touchDragIdx, setTouchDragIdx] = useState<number | null>(null);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleDragStart = (index: number) => {
    dragItem.current = index;
    setDragIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    dragOverItem.current = index;
  };

  const handleDrop = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    const newItems = [...items];
    const draggedItem = newItems[dragItem.current];
    newItems.splice(dragItem.current, 1);
    newItems.splice(dragOverItem.current, 0, draggedItem);
    setItems(newItems);
    dragItem.current = null;
    dragOverItem.current = null;
    setDragIndex(null);
  };

  const moveItem = (from: number, to: number) => {
    if (to < 0 || to >= items.length) return;
    const newItems = [...items];
    const item = newItems[from];
    newItems.splice(from, 1);
    newItems.splice(to, 0, item);
    setItems(newItems);
    setTouchDragIdx(to);
  };

  const handleConfirm = () => {
    if (confirmed) return;
    setConfirmed(true);
    const primaryItemId = `${0}-${options[0]?.text ?? ''}`;
    const score = items.findIndex((item) => item.id === primaryItemId) + 1;
    onAnswer(score);
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

      <p className="text-center text-gray-500 text-xs">
        이상적인 답 말고, 오늘의 나 기준으로 골라보세요
      </p>

      <div className="space-y-3">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            layout
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e as unknown as React.DragEvent, index)}
            onDragEnd={handleDrop}
            className={`
              flex items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-grab active:cursor-grabbing
              ${
                dragIndex === index || touchDragIdx === index
                  ? 'border-white bg-white/10 scale-105'
                  : 'border-gray-700 bg-gray-800/50'
              }
            `}
          >
            <span className="text-gray-500 text-sm font-bold w-6">{index + 1}</span>
            <span className="text-3xl">{item.emoji}</span>
            <span className="text-white font-medium flex-1">{item.text}</span>

            <div className="flex flex-col gap-1">
              <button
                onClick={() => moveItem(index, index - 1)}
                disabled={index === 0}
                className="text-gray-500 hover:text-white disabled:opacity-20 text-xs p-1"
              >
                ▲
              </button>
              <button
                onClick={() => moveItem(index, index + 1)}
                disabled={index === items.length - 1}
                className="text-gray-500 hover:text-white disabled:opacity-20 text-xs p-1"
              >
                ▼
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <button
        onClick={handleConfirm}
        disabled={confirmed}
        className="w-full py-4 rounded-2xl font-bold text-lg transition-all active:scale-95 bg-white text-black hover:bg-gray-200 disabled:opacity-50"
      >
        이 순서가 진짜 내 마음
      </button>
    </motion.div>
  );
}
