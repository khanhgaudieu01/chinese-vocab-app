import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/vocabulary - Lấy tất cả từ vựng
export async function GET() {
  try {
    const vocabularies = await db.vocabulary.getAll();
    return NextResponse.json(vocabularies);
  } catch (error) {
    console.error('Error fetching vocabularies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch vocabularies' },
      { status: 500 }
    );
  }
}

// POST /api/vocabulary - Tạo từ vựng mới
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { chinese, pinyin, vietnamese, notes, example } = body;

    // Validation
    if (!chinese || !pinyin || !vietnamese) {
      return NextResponse.json(
        { error: 'Chinese, pinyin, and vietnamese are required' },
        { status: 400 }
      );
    }

    const vocabulary = await db.vocabulary.create({
      chinese,
      pinyin,
      vietnamese,
      notes,
      example,
    });

    return NextResponse.json(vocabulary, { status: 201 });
  } catch (error) {
    console.error('Error creating vocabulary:', error);
    return NextResponse.json(
      { error: 'Failed to create vocabulary' },
      { status: 500 }
    );
  }
} 