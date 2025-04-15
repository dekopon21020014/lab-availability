// src/app/api/members/[id]/route.ts
import { NextResponse } from 'next/server'
import { db } from '@/lib/firebase'

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params
  const body = await req.json()
  const { name, grade, status } = body

  try {
    await db.collection('members').doc(id).update({
      ...(name && { name }),
      ...(grade && { grade }),
      ...(typeof status === 'number' && { status }),
      updated_at: new Date(),
    })

    return NextResponse.json({ message: '更新成功' })
  } catch (err) {
    return NextResponse.json({ message: '更新失敗', error: `${err}` }, { status: 500 })
  }
}
