'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, X } from 'lucide-react';

const vocabularySchema = z.object({
  chinese: z.string().min(1, 'Từ tiếng Trung không được để trống'),
  pinyin: z.string().min(1, 'Pinyin không được để trống'),
  vietnamese: z.string().min(1, 'Nghĩa tiếng Việt không được để trống'),
  notes: z.string().optional(),
  example: z.string().optional(),
});

type VocabularyFormData = z.infer<typeof vocabularySchema>;

interface AddVocabularyFormProps {
  onSubmit: (data: VocabularyFormData) => Promise<void>;
  onCancel?: () => void;
}

export default function AddVocabularyForm({ onSubmit, onCancel }: AddVocabularyFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VocabularyFormData>({
    resolver: zodResolver(vocabularySchema),
  });

  const handleFormSubmit = async (data: VocabularyFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error('Error adding vocabulary:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Thêm từ vựng mới</h2>
        {onCancel && (
          <button
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Chinese Character */}
        <div>
          <label htmlFor="chinese" className="block text-sm font-medium text-gray-700 mb-1">
            Từ tiếng Trung (汉字) *
          </label>
          <input
            {...register('chinese')}
            type="text"
            id="chinese"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="你好"
          />
          {errors.chinese && (
            <p className="mt-1 text-sm text-red-600">{errors.chinese.message}</p>
          )}
        </div>

        {/* Pinyin */}
        <div>
          <label htmlFor="pinyin" className="block text-sm font-medium text-gray-700 mb-1">
            Pinyin (拼音) *
          </label>
          <input
            {...register('pinyin')}
            type="text"
            id="pinyin"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="nǐ hǎo"
          />
          {errors.pinyin && (
            <p className="mt-1 text-sm text-red-600">{errors.pinyin.message}</p>
          )}
        </div>

        {/* Vietnamese Meaning */}
        <div>
          <label htmlFor="vietnamese" className="block text-sm font-medium text-gray-700 mb-1">
            Nghĩa tiếng Việt *
          </label>
          <input
            {...register('vietnamese')}
            type="text"
            id="vietnamese"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Xin chào"
          />
          {errors.vietnamese && (
            <p className="mt-1 text-sm text-red-600">{errors.vietnamese.message}</p>
          )}
        </div>

        {/* Example Sentence */}
        <div>
          <label htmlFor="example" className="block text-sm font-medium text-gray-700 mb-1">
            Ví dụ câu
          </label>
          <textarea
            {...register('example')}
            id="example"
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="你好，我是小明。"
          />
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Ghi chú
          </label>
          <textarea
            {...register('notes')}
            id="notes"
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ghi chú để nhớ từ này..."
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-3 pt-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Hủy
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Plus size={16} />
            <span>{isSubmitting ? 'Đang thêm...' : 'Thêm từ vựng'}</span>
          </button>
        </div>
      </form>
    </div>
  );
} 