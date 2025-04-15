// // lib/db.ts
// import Database from 'better-sqlite3'
// import path from 'path'
// import { existsSync, mkdirSync } from 'fs'

// // dbディレクトリを確保
// const dbDir = path.resolve(process.cwd(), 'db')
// if (!existsSync(dbDir)) {
//   mkdirSync(dbDir)
// }

// // SQLite DBファイル
// const dbPath = path.join(dbDir, 'db.sqlite')
// const db = new Database(dbPath)

// // 初回だけテーブル作成
// db.exec(`
//   CREATE TABLE IF NOT EXISTS members (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT NOT NULL,
//     grade TEXT NOT NULL,
//     status INTEGER DEFAULT 0
//   )
// `)

// export default db
