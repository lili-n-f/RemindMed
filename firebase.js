import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAreJKr3j90FE7CH2Z96El1DHNGQf2YSJU',
  authDomain: 'remindmed-c6f9b.firebaseapp.com',
  projectId: 'remindmed-c6f9b',
  storageBucket: 'remindmed-c6f9b.appspot.com',
  messagingSenderId: '184289951030',
  appId: '1:184289951030:web:9e91dae52be92c3db9c797',
  measurementId: 'G-WVYL08XNDV',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
