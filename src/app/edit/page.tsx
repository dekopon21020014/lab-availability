'use client'

import { useEffect, useState } from 'react'

type Member = {
  id: number
  name: string
  grade: string
}

export default function EditMemberPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [selectedId, setSelectedId] = useState<string>('')
  const [name, setName] = useState('')
  const [grade, setGrade] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchMembers = async () => {
      const res = await fetch('/api/members')
      const data = await res.json()
      setMembers(data)
    }
    fetchMembers()
  }, [])

  useEffect(() => {
    if (selectedId !== null) {
      const member = members.find((m) => m.id === selectedId)
      if (member) {
        setName(member.name)
        setGrade(member.grade)
      }
    }
  }, [selectedId])

  const handleSubmit = async () => {
    if (selectedId === null) return

    const res = await fetch(`/api/members/${selectedId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, grade }),
    })

    if (res.ok) {
      setMessage('更新しました！')
    } else {
      setMessage('更新に失敗しました。')
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>ユーザー情報編集</h1>

      <label>
        ユーザー選択:
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
        >
          <option value="">選択してください</option>
          {members.map(member => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </select>

      </label>

      {selectedId !== null && (
        <div style={{ marginTop: '1rem' }}>
          <div>
            <label>
              氏名:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              学年:
              <input
                type="text"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              />
            </label>
          </div>
          <button onClick={handleSubmit} style={{ marginTop: '1rem' }}>
            更新
          </button>
        </div>
      )}

      {message && <p>{message}</p>}
    </div>
  )
}
