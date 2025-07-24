// firebase.ts
import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// 🔐 Reemplaza con tus credenciales de Firebase (desde Firebase Console)
const firebaseConfig = {
  apiKey: 'AIzaSyChAS_n1ZDAQ4PDwwVGUrEVnYSkgH7mhKQ',
  authDomain: 'promede1.firebaseapp.com',
  projectId: 'promede1',
  storageBucket: 'TU_BUCKET.appspot.com',
  messagingSenderId: 'TU_MESSAGING_ID',
  appId: 'TU_APP_ID',
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);