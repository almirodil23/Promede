// firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyChAS_n1ZDAQ4PDwwVGUrEVnYSkgH7mhKQ',
  authDomain: 'promede1.firebaseapp.com',
  projectId: 'promede1',
  storageBucket: 'TU_BUCKET.appspot.com',
  messagingSenderId: 'TU_MESSAGING_ID',
  appId: 'TU_APP_ID',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
