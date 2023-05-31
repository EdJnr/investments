// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5nPTy24IBJyivMEmwABL4GgXwr-sGWK8",
  authDomain: "auth-a13fe.firebaseapp.com",
  projectId: "auth-a13fe",
  storageBucket: "auth-a13fe.appspot.com",
  messagingSenderId: "139543703026",
  appId: "1:139543703026:web:89fbb0ab63db8c630e4f6b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

