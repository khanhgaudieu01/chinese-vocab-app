'use client';

import { useState } from 'react';
import { Vocabulary } from '@/types';
import { getLevelDescription } from '@/utils/spacedRepetition';
import { Eye, EyeOff, Edit, Trash2 } from 'lucide-react';

interface VocabularyCardProps {
  vocabulary: Vocabulary;
  onEdit?: (vocabulary: Vocabulary) => void;
  onDelete?: (id: number) => void;
  showAnswer?: boolean;
  onToggleAnswer?: () => void;
  isReviewMode?: boolean;
}

export default function VocabularyCard({
  vocabulary,
  onEdit,
  onDelete,
  showAnswer = false,
  onToggleAnswer,
  isReviewMode = false,
}: VocabularyCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    if (isReviewMode && onToggleAnswer) {
      onToggleAnswer();
    } else {
      setIsFlipped(!isFlipped);
    }
  };

  const getLevelColor = (level: number) => {
    const colors = {
      1: 'bg-red-100 text-red-800',
      2: 'bg-orange-100 text-orange-800',
      3: 'bg-yellow-100 text-yellow-800',
      4: 'bg-blue-100 text-blue-800',
      5: 'bg-green-100 text-green-800',
      6: 'bg-purple-100 text-purple-800',
    };
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(vocabulary.level)}`}>
              Level {vocabulary.level}
            </span>
            <span className="text-xs text-gray-500">
              {getLevelDescription(vocabulary.level)}
            </span>
          </div>
          
          {!isReviewMode && (
            <div className="flex space-x-2">
              {onEdit && (
                <button
                  onClick={() => onEdit(vocabulary)}
                  className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <Edit size={16} />
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(vocabulary.id)}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Chinese Character */}
        <div className="text-center mb-4">
          <div className="text-4xl font-bold text-gray-800 mb-2 chinese-text">
            {vocabulary.chinese}
          </div>
          
          {showAnswer && (
            <div className="text-lg text-gray-600 mb-2">
              {vocabulary.pinyin}
            </div>
          )}
        </div>

        {/* Answer Section */}
        {showAnswer && (
          <div className="space-y-3">
            <div className="text-center">
              <div className="text-lg font-medium text-gray-700">
                {vocabulary.vietnamese}
              </div>
            </div>
            
            {vocabulary.example && (
              <div className="mt-3 p-3 bg-gray-50 rounded-md">
                <div className="text-sm text-gray-600 mb-1">Ví dụ:</div>
                <div className="text-sm">{vocabulary.example}</div>
              </div>
            )}
            
            {vocabulary.notes && (
              <div className="mt-2 p-3 bg-blue-50 rounded-md">
                <div className="text-sm text-blue-600 mb-1">Ghi chú:</div>
                <div className="text-sm text-blue-700">{vocabulary.notes}</div>
              </div>
            )}
          </div>
        )}

        {/* Review Mode Controls */}
        {isReviewMode && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={onToggleAnswer}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {showAnswer ? (
                <>
                  <EyeOff size={16} />
                  <span>Ẩn đáp án</span>
                </>
              ) : (
                <>
                  <Eye size={16} />
                  <span>Xem đáp án</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Ôn tập: {vocabulary.reviewCount} lần</span>
            <span>
              Tiếp theo: {new Date(vocabulary.nextReviewDate).toLocaleDateString('vi-VN')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 