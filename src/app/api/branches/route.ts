import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const branchesPath = path.join(process.cwd(), 'src/data/branches.json');

export async function GET() {
  try {
    const data = JSON.parse(fs.readFileSync(branchesPath, 'utf-8'));
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to read branches:', error);
    return NextResponse.json({ branches: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    fs.writeFileSync(branchesPath, JSON.stringify(body, null, 2), 'utf-8');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to save branches:', error);
    return NextResponse.json({ error: 'Failed to save branches' }, { status: 500 });
  }
}

