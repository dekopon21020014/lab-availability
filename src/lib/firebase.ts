// lib/firebase.ts
import { getApps, initializeApp, cert } from 'firebase-admin/app'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'  // FieldValue をインポート
import serviceAccount from './firebase-service-account.json'

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  })
}

const db = getFirestore()

export { db, FieldValue }  // db と FieldValue をエクスポート
