import { addDays } from 'date-fns';
import { SPACED_REPETITION_LEVELS, SpacedRepetitionLevel } from '@/types';

/**
 * Tính toán ngày ôn tập tiếp theo dựa trên kết quả ôn tập
 * @param currentLevel - Cấp độ hiện tại
 * @param result - Kết quả ôn tập (true = pass, false = fail)
 * @returns Ngày ôn tập tiếp theo và cấp độ mới
 */
export function calculateNextReview(
  currentLevel: number,
  result: boolean
): { nextReviewDate: Date; newLevel: number } {
  let newLevel: number;
  
  if (result) {
    // Nếu pass, tăng level lên 1 (tối đa 6)
    newLevel = Math.min(currentLevel + 1, 6);
  } else {
    // Nếu fail, giảm level về 1
    newLevel = 1;
  }
  
  // Lấy số ngày từ level mới
  const daysToAdd = SPACED_REPETITION_LEVELS[newLevel as SpacedRepetitionLevel] || 1;
  
  // Tính ngày ôn tập tiếp theo
  const nextReviewDate = addDays(new Date(), daysToAdd);
  
  return { nextReviewDate, newLevel };
}

/**
 * Lấy danh sách từ cần ôn tập hôm nay
 * @param vocabularies - Danh sách từ vựng
 * @returns Danh sách từ cần ôn tập
 */
export function getTodayReviewList(vocabularies: any[]) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return vocabularies.filter(vocab => {
    const reviewDate = new Date(vocab.nextReviewDate);
    reviewDate.setHours(0, 0, 0, 0);
    return reviewDate <= today && vocab.isActive;
  });
}

/**
 * Tính tỷ lệ thành công của từ vựng
 * @param reviewHistory - Lịch sử ôn tập
 * @returns Tỷ lệ thành công (0-1)
 */
export function calculateSuccessRate(reviewHistory: any[]): number {
  if (reviewHistory.length === 0) return 0;
  
  const correctReviews = reviewHistory.filter(review => review.result).length;
  return correctReviews / reviewHistory.length;
}

/**
 * Tính điểm số học tập dựa trên level và số lần ôn tập
 * @param level - Cấp độ hiện tại
 * @param reviewCount - Số lần ôn tập
 * @returns Điểm số (0-100)
 */
export function calculateScore(level: number, reviewCount: number): number {
  // Điểm cơ bản từ level (0-60 điểm)
  const levelScore = Math.min(level * 10, 60);
  
  // Điểm từ số lần ôn tập (0-40 điểm)
  const reviewScore = Math.min(reviewCount * 2, 40);
  
  return levelScore + reviewScore;
}

/**
 * Kiểm tra xem từ có cần ôn tập lại không
 * @param vocabulary - Từ vựng
 * @returns true nếu cần ôn tập
 */
export function needsReview(vocabulary: any): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const reviewDate = new Date(vocabulary.nextReviewDate);
  reviewDate.setHours(0, 0, 0, 0);
  
  return reviewDate <= today && vocabulary.isActive;
}

/**
 * Lấy thông tin level dưới dạng text
 * @param level - Cấp độ
 * @returns Mô tả level
 */
export function getLevelDescription(level: number): string {
  const descriptions = {
    1: 'Mới học',
    2: 'Đang học',
    3: 'Đã biết',
    4: 'Thuộc lòng',
    5: 'Thành thạo',
    6: 'Hoàn hảo'
  };
  
  return descriptions[level as keyof typeof descriptions] || 'Không xác định';
} 