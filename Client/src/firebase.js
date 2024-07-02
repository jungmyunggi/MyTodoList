//firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js";
import { 
  getAuth,// authentication 설정
  signInWithPopup, //google 로그인을 팝업창에 띄우기 위해
  GoogleAuthProvider, //google login 기능
  signInWithEmailAndPassword,// email 로그인
  createUserWithEmailAndPassword, //email 회원가입
} from 'https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js';

const firebaseConfig = {
  apiKey: "AIzaSyDOM1jNxrDY9M2TvguXgYHEshqTkai7kvc",
  authDomain: "mtdl-5ac0a.firebaseapp.com",
  projectId: "mtdl-5ac0a",
  storageBucket: "mtdl-5ac0a.appspot.com",
  messagingSenderId: "836228840065",
  appId: "1:836228840065:web:f47b5cd773c9af253b6b80",
  measurementId: "G-2YN1CKN4WP"
};
//...

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth 설정 필수!!
const auth = getAuth();

//Email 로그인
export const signupEmail = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

//Email 회원가입
export const loginEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};