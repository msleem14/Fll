import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const jobsPath = path.join(process.cwd(), 'src/data/jobs.json');

export async function GET() {
  try {
    const data = JSON.parse(fs.readFileSync(jobsPath, 'utf-8'));
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to read jobs:', error);
    return NextResponse.json({ jobs: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    fs.writeFileSync(jobsPath, JSON.stringify(body, null, 2), 'utf-8');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to save jobs:', error);
    return NextResponse.json({ error: 'Failed to save jobs' }, { status: 500 });
  }
}

