// src/app/api/students/route.ts
import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET() {
  try {
    const stmt = db.prepare('SELECT * FROM members ORDER BY id DESC')
    const students = stmt.all()
    return NextResponse.json(students)
  } catch (err) {
    return NextResponse.json({ error: '取得に失敗しました' }, { status: 500 })
  }
}
