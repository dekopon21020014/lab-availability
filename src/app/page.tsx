'use client'

import { useEffect, useState } from 'react'

type Member = {
  id: number
  name: string
  grade: string
  status: number // 1: 在室, 0: 不在
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([])

  useEffect(() => {
    const fetchMembers = async () => {
      const res = await fetch('/api/members')
      if (res.ok) {
        const data = await res.json()
        setMembers(data)
      } else {
        alert('データの取得に失敗しました')
      }
    }

    fetchMembers()
  }, [])

  // メンバーの状態を更新する関数
  const toggleStatus = async (id: number, currentStatus: number) => {
    const newStatus = currentStatus === 1 ? 0 : 1 // 1なら0に、0なら1に切り替える
    const res = await fetch(`/api/members/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    })
    
    if (res.ok) {
      // サーバーのデータが更新されたら、ローカルのデータも更新
      setMembers((prevMembers) =>
        prevMembers.map((member) =>
          member.id === id ? { ...member, status: newStatus } : member
        )
      )
    } else {
      alert('ステータスの更新に失敗しました')
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>メンバー一覧</h1>

      {members.length === 0 ? (
        <p>データがありません。</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '2rem' }}>
          <thead>
            <tr>
              <th style={{ padding: '0.8rem', border: '1px solid #ddd', backgroundColor: '#f4f4f4' }}>名前</th>
              <th style={{ padding: '0.8rem', border: '1px solid #ddd', backgroundColor: '#f4f4f4' }}>学年</th>
              <th style={{ padding: '0.8rem', border: '1px solid #ddd', backgroundColor: '#f4f4f4' }}>状態</th>
              <th style={{ padding: '0.8rem', border: '1px solid #ddd', backgroundColor: '#f4f4f4' }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id}>
                <td style={{ padding: '0.8rem', border: '1px solid #ddd' }}>{m.name}</td>
                <td style={{ padding: '0.8rem', border: '1px solid #ddd' }}>{m.grade}</td>
                <td
                  style={{
                    padding: '0.8rem',
                    border: '1px solid #ddd',
                    fontWeight: 'bold',
                    color: m.status === 1 ? 'green' : 'red',
                  }}
                >
                  {m.status === 1 ? '在室' : '不在'}
                </td>
                <td style={{ padding: '0.8rem', border: '1px solid #ddd' }}>
                  <button
                    onClick={() => toggleStatus(m.id, m.status)}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    {m.status === 1 ? '不在にする' : '在室にする'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
