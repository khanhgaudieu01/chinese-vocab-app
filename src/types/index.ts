// Types cho ứng dụng học từ vựng tiếng Trung

export interface Vocabulary {
  id: number;
  chinese: string;
  pinyin: string;
  vietnamese: string;
  notes?: string;
  example?: string;
  createdAt: Date;
  updatedAt: Date;
  nextReviewDate: Date;
  level: number;
  reviewCount: number;
  isActive: boolean;
}

export interface ReviewHistory {
  id: number;
  vocabularyId: number;
  reviewDate: Date;
  result: boolean;
  timeSpent?: number;
  vocabulary?: Vocabulary;
}

export interface StudyStats {
  id: number;
  date: Date;
  totalReviews: number;
  correctReviews: number;
  newWordsAdded: number;
  studyTime: number;
}

export interface CreateVocabularyInput {
  chinese: string;
  pinyin: string;
  vietnamese: string;
  notes?: string;
  example?: string;
}

export interface UpdateVocabularyInput {
  chinese?: string;
  pinyin?: string;
  vietnamese?: string;
  notes?: string;
  example?: string;
  level?: number;
  isActive?: boolean;
}

export interface ReviewResult {
  vocabularyId: number;
  result: boolean;
  timeSpent?: number;
}

// Spaced Repetition Levels
export const SPACED_REPETITION_LEVELS = {
  1: 1,    // 1 ngày
  2: 3,    // 3 ngày
  3: 7,    // 1 tuần
  4: 14,   // 2 tuần
  5: 30,   // 1 tháng
  6: 60,   // 2 tháng
} as const;

export type SpacedRepetitionLevel = keyof typeof SPACED_REPETITION_LEVELS; 