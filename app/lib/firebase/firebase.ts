import { FirebaseApp, initializeApp , getApps} from 'firebase/app';
import { getFirestore, } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCqU75b8BZF04-6yNiWXUeLGs3QvxGQ2hs",
  authDomain: "nemura-3e122.firebaseapp.com",
  projectId: "nemura-3e122",
  storageBucket: "nemura-3e122.firebasestorage.app",
  messagingSenderId: "935568627476",
  appId: "1:935568627476:web:0d489a43c493d1fdfe9401"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firestore
export const db = getFirestore(app);
export const auth = getAuth(app);


