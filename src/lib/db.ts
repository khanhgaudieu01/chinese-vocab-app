import { PrismaClient } from '../generated/prisma';

// Tạo Prisma client instance
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Database utility functions
export const db = {
  // Vocabulary operations
  vocabulary: {
    // Lấy tất cả từ vựng
    getAll: async () => {
      return await prisma.vocabulary.findMany({
        where: { isActive: true },
        orderBy: { createdAt: 'desc' },
      });
    },

    // Lấy từ vựng theo ID
    getById: async (id: number) => {
      return await prisma.vocabulary.findUnique({
        where: { id },
        include: {
          reviewHistory: {
            orderBy: { reviewDate: 'desc' },
            take: 10,
          },
        },
      });
    },

    // Tạo từ vựng mới
    create: async (data: {
      chinese: string;
      pinyin: string;
      vietnamese: string;
      notes?: string;
      example?: string;
    }) => {
      const nextReviewDate = new Date();
      nextReviewDate.setDate(nextReviewDate.getDate() + 1); // Ôn tập ngày mai

      return await prisma.vocabulary.create({
        data: {
          ...data,
          nextReviewDate,
          level: 1,
          reviewCount: 0,
          isActive: true,
        },
      });
    },

    // Cập nhật từ vựng
    update: async (id: number, data: any) => {
      return await prisma.vocabulary.update({
        where: { id },
        data,
      });
    },

    // Xóa từ vựng (soft delete)
    delete: async (id: number) => {
      return await prisma.vocabulary.update({
        where: { id },
        data: { isActive: false },
      });
    },

    // Lấy từ cần ôn tập hôm nay
    getTodayReviews: async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return await prisma.vocabulary.findMany({
        where: {
          isActive: true,
          nextReviewDate: {
            lte: today,
          },
        },
        orderBy: { nextReviewDate: 'asc' },
      });
    },

    // Cập nhật kết quả ôn tập
    updateReviewResult: async (
      id: number,
      result: boolean,
      timeSpent?: number
    ) => {
      const vocabulary = await prisma.vocabulary.findUnique({
        where: { id },
      });

      if (!vocabulary) throw new Error('Vocabulary not found');

      // Tính toán level mới và ngày ôn tập tiếp theo
      let newLevel: number;
      if (result) {
        newLevel = Math.min(vocabulary.level + 1, 6);
      } else {
        newLevel = 1;
      }

      // Tính ngày ôn tập tiếp theo
      const daysToAdd = [1, 3, 7, 14, 30, 60][newLevel - 1] || 1;
      const nextReviewDate = new Date();
      nextReviewDate.setDate(nextReviewDate.getDate() + daysToAdd);

      // Tạo transaction để cập nhật cả vocabulary và review history
      return await prisma.$transaction(async (tx) => {
        // Cập nhật vocabulary
        const updatedVocabulary = await tx.vocabulary.update({
          where: { id },
          data: {
            level: newLevel,
            reviewCount: vocabulary.reviewCount + 1,
            nextReviewDate,
          },
        });

        // Tạo review history
        await tx.reviewHistory.create({
          data: {
            vocabularyId: id,
            result,
            timeSpent,
          },
        });

        return updatedVocabulary;
      });
    },
  },

  // Review history operations
  reviewHistory: {
    // Lấy lịch sử ôn tập của từ vựng
    getByVocabularyId: async (vocabularyId: number) => {
      return await prisma.reviewHistory.findMany({
        where: { vocabularyId },
        orderBy: { reviewDate: 'desc' },
      });
    },

    // Lấy thống kê ôn tập
    getStats: async (days: number = 7) => {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      return await prisma.reviewHistory.groupBy({
        by: ['result'],
        where: {
          reviewDate: {
            gte: startDate,
          },
        },
        _count: {
          result: true,
        },
      });
    },
  },

  // Study stats operations
  studyStats: {
    // Tạo hoặc cập nhật thống kê học tập
    upsertDailyStats: async (data: {
      totalReviews: number;
      correctReviews: number;
      newWordsAdded: number;
      studyTime: number;
    }) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return await prisma.studyStats.upsert({
        where: {
          date: today,
        },
        update: data,
        create: {
          ...data,
          date: today,
        },
      });
    },

    // Lấy thống kê học tập theo ngày
    getByDateRange: async (startDate: Date, endDate: Date) => {
      return await prisma.studyStats.findMany({
        where: {
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
        orderBy: { date: 'asc' },
      });
    },
  },
}; 