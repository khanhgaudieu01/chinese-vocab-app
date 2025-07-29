import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/review - Lấy danh sách từ cần ôn tập hôm nay
export async function GET() {
  try {
    const todayReviews = await db.vocabulary.getTodayReviews();
    return NextResponse.json(todayReviews);
  } catch (error) {
    console.error('Error fetching today reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch today reviews' },
      { status: 500 }
    );
  }
}

// POST /api/review - Cập nhật kết quả ôn tập
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { vocabularyId, result, timeSpent } = body;

    // Validation
    if (vocabularyId === undefined || result === undefined) {
      return NextResponse.json(
        { error: 'vocabularyId and result are required' },
        { status: 400 }
      );
    }

    const updatedVocabulary = await db.vocabulary.updateReviewResult(
      vocabularyId,
      result,
      timeSpent
    );

    return NextResponse.json(updatedVocabulary);
  } catch (error) {
    console.error('Error updating review result:', error);
    return NextResponse.json(
      { error: 'Failed to update review result' },
      { status: 500 }
    );
  }
} 