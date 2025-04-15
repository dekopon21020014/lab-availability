// // src/app/api/members/[id]/route.ts
// import { NextResponse } from 'next/server'
// import { db } from '@/lib/firebase'

// export async function PUT(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   const { id } = await params
//   const body = await req.json()
//   const { name, grade, status } = body

//   try {
//     await db.collection('members').doc(id).update({
//       ...(name && { name }),
//       ...(grade && { grade }),
//       ...(typeof status === 'number' && { status }),
//       updated_at: new Date(),
//     })

//     return NextResponse.json({ message: '更新成功' })
//   } catch (err) {
//     return NextResponse.json({ message: '更新失敗', error: `${err}` }, { status: 500 })
//   }
// }

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'

export async function PUT(req: NextRequest) {
  const url = new URL(req.url)
  const id = url.pathname.split('/').pop()  // 最後のスラッグ部分を取得（[id]）

  const body = await req.json()
  const { name, grade, status } = body

  if (!id) {
    return NextResponse.json({ error: 'IDが指定されていません' }, { status: 400 })
  }

  try {
    // Firestore更新処理など
    const docRef = db.collection('members').doc(id)
    await docRef.update({ name, grade, status })

    return NextResponse.json({ message: '更新しました' })
  } catch (err) {
    console.error('更新エラー:', err)
    return NextResponse.json({ error: '更新に失敗しました' }, { status: 500 })
  }
}
