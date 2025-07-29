'use client';

import { useState, useEffect } from 'react';
import { Vocabulary } from '@/types';
import VocabularyCard from './VocabularyCard';
import { Check, X, ArrowRight } from 'lucide-react';

interface ReviewSessionProps {
  vocabularies: Vocabulary[];
  onReviewComplete: (results: { vocabularyId: number; result: boolean }[]) => void;
  onClose: () => void;
}

export default function ReviewSession({ vocabularies, onReviewComplete, onClose }: ReviewSessionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [results, setResults] = useState<{ vocabularyId: number; result: boolean }[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentVocabulary = vocabularies[currentIndex];
  const progress = ((currentIndex + 1) / vocabularies.length) * 100;

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleResult = (result: boolean) => {
    const newResults = [...results, { vocabularyId: currentVocabulary.id, result }];
    setResults(newResults);

    if (currentIndex < vocabularies.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    } else {
      setIsCompleted(true);
      onReviewComplete(newResults);
    }
  };

  const handleSkip = () => {
    handleResult(false);
  };

  if (vocabularies.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Không có từ nào cần ôn tập</h2>
          <p className="text-gray-600 mb-6">
            Tất cả từ vựng của bạn đã được ôn tập hoặc chưa đến lịch ôn tập.
          </p>
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    const correctCount = results.filter(r => r.result).length;
    const accuracy = (correctCount / results.length) * 100;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Hoàn thành ôn tập!</h2>
          
          <div className="space-y-4 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{accuracy.toFixed(1)}%</div>
              <div className="text-gray-600">Độ chính xác</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{correctCount}</div>
                <div className="text-sm text-green-700">Đúng</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{results.length - correctCount}</div>
                <div className="text-sm text-red-700">Sai</div>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Hoàn thành
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Ôn tập từ vựng ({currentIndex + 1}/{vocabularies.length})
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Vocabulary Card */}
        <div className="p-6">
          <VocabularyCard
            vocabulary={currentVocabulary}
            showAnswer={showAnswer}
            onToggleAnswer={handleShowAnswer}
            isReviewMode={true}
          />
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t border-gray-200">
          {!showAnswer ? (
            <div className="flex justify-center">
              <button
                onClick={handleShowAnswer}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <ArrowRight size={20} />
                <span>Xem đáp án</span>
              </button>
            </div>
          ) : (
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleResult(false)}
                className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                <X size={20} />
                <span>Sai</span>
              </button>
              
              <button
                onClick={() => handleResult(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                <Check size={20} />
                <span>Đúng</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 