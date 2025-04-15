// app/api/submit/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'  // Firebase Firestoreインスタンスをインポート
import { FieldValue } from 'firebase-admin/firestore'

interface Member {
  name: string
  grade: string
  status: number
  createdAt: any  // ここは Timestamp型に変更したほうが良いかも
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, grade } = body

  // 必須フィールドのバリデーション
  if (!name || !grade) {
    return NextResponse.json({ error: '名前と学年は必須です' }, { status: 400 })
  }

  try {
    // Firestoreに新しいメンバーを追加
    const membersRef = db.collection('members')  // membersコレクションを参照
    await membersRef.add({
      name,
      grade,
      status: 0,  // 初期値は0
      createdAt: FieldValue.serverTimestamp(),  // Firestoreで作成日時を記録
    })

    return NextResponse.json({ message: '保存しました' })
  } catch (err) {
    console.error('保存エラー:', err)
    return NextResponse.json({ error: '保存に失敗しました' }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Firestoreのmembersコレクションからデータを取得
    const membersSnapshot = await db.collection('members').get()

    // ドキュメントを配列に変換
    const members = membersSnapshot.docs.map(doc => {
      const data = doc.data() as Member
      return {
        id: doc.id, // FirestoreのIDを返す
        ...data, // ドキュメントデータを展開
      }
    })
    return NextResponse.json(members)
  } catch (err) {
    console.error('取得エラー:', err)
    return NextResponse.json({ error: '取得に失敗しました' }, { status: 500 })
  }
}
