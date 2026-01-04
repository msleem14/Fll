import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const contentPath = path.join(process.cwd(), 'src/data/content.json');

export async function GET() {
  try {
    const content = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));
    return NextResponse.json(content);
  } catch (error) {
    console.error('Failed to read content:', error);
    return NextResponse.json({ error: 'Failed to read content' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    fs.writeFileSync(contentPath, JSON.stringify(body, null, 2), 'utf-8');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to save content:', error);
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
}

