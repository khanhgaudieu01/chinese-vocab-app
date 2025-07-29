'use client';

import { useState, useEffect } from 'react';
import { Vocabulary } from '@/types';
import VocabularyCard from '@/components/VocabularyCard';
import AddVocabularyForm from '@/components/AddVocabularyForm';
import ReviewSession from '@/components/ReviewSession';
import { BookOpen, Plus, Play, BarChart3, Calendar } from 'lucide-react';

export default function Home() {
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);
  const [todayReviews, setTodayReviews] = useState<Vocabulary[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showReviewSession, setShowReviewSession] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch vocabularies on component mount
  useEffect(() => {
    fetchVocabularies();
    fetchTodayReviews();
  }, []);

  const fetchVocabularies = async () => {
    try {
      const response = await fetch('/api/vocabulary');
      if (response.ok) {
        const data = await response.json();
        setVocabularies(data);
      }
    } catch (error) {
      console.error('Error fetching vocabularies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTodayReviews = async () => {
    try {
      const response = await fetch('/api/review');
      if (response.ok) {
        const data = await response.json();
        setTodayReviews(data);
      }
    } catch (error) {
      console.error('Error fetching today reviews:', error);
    }
  };

  const handleAddVocabulary = async (data: any) => {
    try {
      const response = await fetch('/api/vocabulary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const newVocabulary = await response.json();
        setVocabularies([newVocabulary, ...vocabularies]);
        setShowAddForm(false);
        fetchTodayReviews(); // Refresh today's reviews
      }
    } catch (error) {
      console.error('Error adding vocabulary:', error);
    }
  };

  const handleDeleteVocabulary = async (id: number) => {
    if (!confirm('Bạn có chắc muốn xóa từ vựng này?')) return;

    try {
      const response = await fetch(`/api/vocabulary/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setVocabularies(vocabularies.filter(v => v.id !== id));
        fetchTodayReviews();
      }
    } catch (error) {
      console.error('Error deleting vocabulary:', error);
    }
  };

  const handleReviewComplete = async (results: { vocabularyId: number; result: boolean }[]) => {
    try {
      // Send all results to the API
      for (const result of results) {
        await fetch('/api/review', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(result),
        });
      }

      // Refresh data
      fetchVocabularies();
      fetchTodayReviews();
      setShowReviewSession(false);
    } catch (error) {
      console.error('Error updating review results:', error);
    }
  };

  const stats = {
    total: vocabularies.length,
    todayReviews: todayReviews.length,
    completedToday: vocabularies.filter(v => 
      new Date(v.nextReviewDate) > new Date()
    ).length,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900">
                Học từ vựng tiếng Trung
              </h1>
            </div>
            
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus size={16} />
              <span>Thêm từ mới</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tổng từ vựng</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Cần ôn tập hôm nay</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.todayReviews}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Đã hoàn thành hôm nay</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.completedToday}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Reviews Section */}
        {stats.todayReviews > 0 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Từ cần ôn tập hôm nay ({stats.todayReviews})
              </h2>
              <button
                onClick={() => setShowReviewSession(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                <Play size={16} />
                <span>Bắt đầu ôn tập</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {todayReviews.slice(0, 6).map((vocabulary) => (
                <VocabularyCard
                  key={vocabulary.id}
                  vocabulary={vocabulary}
                  onDelete={handleDeleteVocabulary}
                />
              ))}
            </div>
            
            {todayReviews.length > 6 && (
              <div className="text-center mt-4">
                <button
                  onClick={() => setShowReviewSession(true)}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Xem tất cả {todayReviews.length} từ cần ôn tập
                </button>
              </div>
            )}
          </div>
        )}

        {/* All Vocabularies Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Tất cả từ vựng ({stats.total})
          </h2>
          
          {vocabularies.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Chưa có từ vựng nào
              </h3>
              <p className="text-gray-600 mb-4">
                Bắt đầu học bằng cách thêm từ vựng đầu tiên của bạn.
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mx-auto"
              >
                <Plus size={16} />
                <span>Thêm từ vựng đầu tiên</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vocabularies.map((vocabulary) => (
                <VocabularyCard
                  key={vocabulary.id}
                  vocabulary={vocabulary}
                  onDelete={handleDeleteVocabulary}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Vocabulary Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="max-w-md w-full">
            <AddVocabularyForm
              onSubmit={handleAddVocabulary}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        </div>
      )}

      {/* Review Session Modal */}
      {showReviewSession && (
        <ReviewSession
          vocabularies={todayReviews}
          onReviewComplete={handleReviewComplete}
          onClose={() => setShowReviewSession(false)}
        />
      )}
    </div>
  );
}
