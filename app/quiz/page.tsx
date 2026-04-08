'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { questions } from '@/data/questions';
import { analyzeAnswers, encodeAnswerCode } from '@/data/results';
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

  useEffect(() => {
    trackQuizStart();
  }, []);

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
              const result = analyzeAnswers(newAnswers);
              trackQuizComplete(result.id);
              setIsLoading(true);
            }
          }, 100);
        }, 1200);
      } else {
        if (currentIndex < questions.length - 1) {
          setCurrentIndex(currentIndex + 1);
        } else {
          const result = analyzeAnswers(newAnswers);
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
    const result = analyzeAnswers(answers);
    const code = encodeAnswerCode(answers);
    router.push(`/result?type=${result.id}&code=${code}`);
  }, [answers, router]);

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col px-6 py-8">
      {/* Back button */}
      <div className="mb-4">
        {currentIndex > 0 ? (
          <button
            onClick={handleBack}
            className="text-sm text-white/55 transition-colors hover:text-white"
          >
            ← 이전
          </button>
        ) : (
          <div className="h-5" />
        )}
      </div>

      <ProgressBar current={currentIndex + 1} total={questions.length} />

      <div className="flex flex-1 flex-col justify-center">
        <AnimatePresence mode="wait">
          <div key={currentIndex}>
            {currentQuestion.type === 'slider' && (
              <SliderQuestion
                question={currentQuestion.question}
                onAnswer={handleAnswer}
              />
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
              <DragSortQuestion
                question={currentQuestion.question}
                options={currentQuestion.options || []}
                onAnswer={handleAnswer}
              />
            )}
            {currentQuestion.type === 'chat' && (
              <ChatQuestion
                question={currentQuestion.question}
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
              <ButtonMashQuestion
                question={currentQuestion.question}
                onAnswer={handleAnswer}
              />
            )}
          </div>
        </AnimatePresence>
      </div>

      <MicroFeedback text={feedback} />
    </div>
  );
}
