import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/vocabulary/[id] - Lấy từ vựng theo ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid ID' },
        { status: 400 }
      );
    }

    const vocabulary = await db.vocabulary.getById(id);
    if (!vocabulary) {
      return NextResponse.json(
        { error: 'Vocabulary not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(vocabulary);
  } catch (error) {
    console.error('Error fetching vocabulary:', error);
    return NextResponse.json(
      { error: 'Failed to fetch vocabulary' },
      { status: 500 }
    );
  }
}

// PUT /api/vocabulary/[id] - Cập nhật từ vựng
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const vocabulary = await db.vocabulary.update(id, body);

    return NextResponse.json(vocabulary);
  } catch (error) {
    console.error('Error updating vocabulary:', error);
    return NextResponse.json(
      { error: 'Failed to update vocabulary' },
      { status: 500 }
    );
  }
}

// DELETE /api/vocabulary/[id] - Xóa từ vựng (soft delete)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid ID' },
        { status: 400 }
      );
    }

    await db.vocabulary.delete(id);

    return NextResponse.json(
      { message: 'Vocabulary deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting vocabulary:', error);
    return NextResponse.json(
      { error: 'Failed to delete vocabulary' },
      { status: 500 }
    );
  }
} 