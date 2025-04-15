import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function PUT(req: Request, context: { params: { id: string } }) {
  const { params } = await context
  const { id } = await params
  const body = await req.json()
  const { name, grade, status } = body

  try {
    const fields = []
    const values: { [key: string]: any } = { id }

    if (name !== undefined) {
      fields.push('name = @name')
      values.name = name
    }

    if (grade !== undefined) {
      fields.push('grade = @grade')
      values.grade = grade
    }

    if (typeof status === 'number') {
      fields.push('status = @status')
      values.status = status
    }

    // fields.push('updated_at = CURRENT_TIMESTAMP')

    const sql = `UPDATE members SET ${fields.join(', ')} WHERE id = @id`
    const stmt = db.prepare(sql)
    stmt.run(values)

    return NextResponse.json({ message: '更新成功' })
  } catch (error) {
    console.error('更新エラー:', error)
    return NextResponse.json({ message: '更新失敗' }, { status: 500 })
  }
}
