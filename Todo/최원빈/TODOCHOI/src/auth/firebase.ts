// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GithubAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDBriS1DilWptB_ev1aJ1DOHdOhhvBUzsM',
  authDomain: 'todochoi-auth.firebaseapp.com',
  projectId: 'todochoi-auth',
  storageBucket: 'todochoi-auth.firebasestorage.app',
  messagingSenderId: '631404340299',
  appId: '1:631404340299:web:9d248b45d536706c5099ce',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GithubAuthProvider();
