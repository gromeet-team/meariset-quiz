'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface MicroFeedbackProps {
  text: string | null;
}

export default function MicroFeedback({ text }: MicroFeedbackProps) {
  return (
    <AnimatePresence>
      {text && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
        >
          <div className="bg-gray-900/95 border border-gray-700 rounded-2xl px-8 py-6 max-w-sm mx-4 text-center backdrop-blur-sm">
            <p className="text-white text-lg font-medium">{text}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
