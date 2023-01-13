import {getStorage} from 'firebase/storage';
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyAu4PJ09oNbtvMj8wd01yX8lJQDEUEeqnE",
  authDomain: "blogpost-47f1e.firebaseapp.com",
  projectId: "blogpost-47f1e",
  storageBucket: "blogpost-47f1e.appspot.com",
  messagingSenderId: "672186615770",
  appId: "1:672186615770:web:eca51d17fe5e5a975aa2e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);