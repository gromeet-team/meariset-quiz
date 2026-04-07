'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { questions } from '@/data/questions';
import { getResultType } from '@/data/results';
import { trackQuizStart, trackQuizComplete } from '@/lib/pixel';
import ProgressBar from '@/components/Quiz/ProgressBar';
import MicroFeedback from '@/components/Quiz/MicroFeedback';
import SliderQuestion from '@/components/Quiz/SliderQuestion';
import ImageSelectQuestion from '@/components/Quiz/ImageSelectQuestion';
import TimerQuestion from '@/components/Quiz/TimerQuestion';
import DragSortQuestion from '@/components/Quiz/DragSortQuestion';
import ChatQuestion from '@/components/Quiz/ChatQuestion';
import GalleryQuestion from '@/components/Quiz/GalleryQuestion';
import ButtonMashQuestion from '@/components/Quiz/ButtonMashQuestion';
import LoadingScreen from '@/components/common/LoadingScreen';

export default function QuizPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [trackedStart, setTrackedStart] = useState(false);

  useEffect(() => {
    if (!trackedStart) {
      trackQuizStart();
      setTrackedStart(true);
    }
  }, [trackedStart]);

  const currentQuestion = questions[currentIndex];

  const handleAnswer = useCallback(
    (score: number) => {
      const q = questions[currentIndex];
      const newAnswers = [...answers];
      newAnswers[currentIndex] = score;
      setAnswers(newAnswers);

      // Show feedback
      let feedbackText: string | null = null;
      if (q.feedback) {
        // For timer timeout, score=4 with special key=0
        if (q.type === 'timer' && score === 4) {
          feedbackText = q.feedback[0] || q.feedback[score] || null;
        } else {
          feedbackText = q.feedback[score] || null;
        }
      }

      if (feedbackText) {
        setFeedback(feedbackText);
        setTimeout(() => {
          setFeedback(null);
          setTimeout(() => {
            if (currentIndex < questions.length - 1) {
              setCurrentIndex(currentIndex + 1);
            } else {
              // All done - show loading
              const totalScore = newAnswers.reduce((a, b) => a + b, 0);
              const result = getResultType(totalScore);
              trackQuizComplete(result.id);
              setIsLoading(true);
            }
          }, 100);
        }, 1200);
      } else {
        if (currentIndex < questions.length - 1) {
          setCurrentIndex(currentIndex + 1);
        } else {
          const totalScore = newAnswers.reduce((a, b) => a + b, 0);
          const result = getResultType(totalScore);
          trackQuizComplete(result.id);
          setIsLoading(true);
        }
      }
    },
    [currentIndex, answers]
  );

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleLoadingComplete = useCallback(() => {
    const totalScore = answers.reduce((a, b) => a + b, 0);
    const result = getResultType(totalScore);
    router.push(`/result?type=${result.id}`);
  }, [answers, router]);

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 max-w-lg mx-auto">
      {/* Back button */}
      <div className="mb-4">
        {currentIndex > 0 ? (
          <button
            onClick={handleBack}
            className="text-gray-500 text-sm hover:text-white transition-colors"
          >
            ← 이전
          </button>
        ) : (
          <div className="h-5" />
        )}
      </div>

      <ProgressBar current={currentIndex + 1} total={questions.length} />

      <div className="flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <div key={currentIndex}>
            {currentQuestion.type === 'slider' && (
              <SliderQuestion onAnswer={handleAnswer} />
            )}
            {currentQuestion.type === 'image-select' && (
              <ImageSelectQuestion
                question={currentQuestion.question}
                options={currentQuestion.options || []}
                onAnswer={handleAnswer}
              />
            )}
            {currentQuestion.type === 'timer' && (
              <TimerQuestion
                question={currentQuestion.question}
                options={currentQuestion.options || []}
                onAnswer={handleAnswer}
              />
            )}
            {currentQuestion.type === 'drag-sort' && (
              <DragSortQuestion onAnswer={handleAnswer} />
            )}
            {currentQuestion.type === 'chat' && (
              <ChatQuestion
                options={currentQuestion.options || []}
                onAnswer={handleAnswer}
              />
            )}
            {currentQuestion.type === 'gallery' && (
              <GalleryQuestion
                question={currentQuestion.question}
                options={currentQuestion.options || []}
                onAnswer={handleAnswer}
              />
            )}
            {currentQuestion.type === 'button-mash' && (
              <ButtonMashQuestion onAnswer={handleAnswer} />
            )}
          </div>
        </AnimatePresence>
      </div>

      <MicroFeedback text={feedback} />
    </div>
  );
}
