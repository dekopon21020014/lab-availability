'use client'

import { useState } from 'react'

export default function FormPage() {
  const [name, setName] = useState('')
  const [grade, setGrade] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, grade }),
    })
  
    if (res.ok) {
      alert('保存しました！')
      setName('')
      setGrade('')
    } else {
      const data = await res.json()
      alert(`エラー: ${data.error}`)
    }
  }
  

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '2rem' }}>
      <h1>フォーム</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>名前</label><br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>学年</label><br />
          <input
            type="text"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </div>
        <button type="submit">送信</button>
      </form>
    </div>
  )
}
