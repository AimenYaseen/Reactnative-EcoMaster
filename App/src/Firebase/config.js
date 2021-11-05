import * as firebase from "firebase";
// import { initializeApp } from 'firebase/app';
// import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBmZjq9A0cF_8qn_rXCZxGRPh94bPrvFNE",
  authDomain: "ecomaster-74319.firebaseapp.com",
  projectId: "ecomaster-74319",
  storageBucket: "ecomaster-74319.appspot.com",
  messagingSenderId: "832095339438",
  appId: "1:832095339438:web:cec61635704a3d6dfdfe3f",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const database = firebase.getDatabase(app);

export { auth };
export { database };
