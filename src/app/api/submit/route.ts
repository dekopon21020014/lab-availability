// app/api/submit/route.ts
import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, grade } = body

  if (!name || !grade) {
    return NextResponse.json({ error: '名前と学年は必須です' }, { status: 400 })
  }

  try {
    const stmt = db.prepare('INSERT INTO members (name, grade, status) VALUES (?, ?, ?)')
    stmt.run(name, grade, 0)
    return NextResponse.json({ message: '保存しました' })
  } catch (err) {
    return NextResponse.json({ error: '保存に失敗しました' }, { status: 500 })
  }
}
