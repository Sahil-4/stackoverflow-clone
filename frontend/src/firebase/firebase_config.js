import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6wSNbS0HfjA4hmdYIhlSSr65v5ScuSYo",
  authDomain: "storage4otherprojs.firebaseapp.com",
  databaseURL: "https://storage4otherprojs.firebaseio.com",
  projectId: "storage4otherprojs",
  storageBucket: "storage4otherprojs.appspot.com",
  messagingSenderId: "574239214582",
  appId: "1:574239214582:web:09faf7771315e85c9b15d7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
