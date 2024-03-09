// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBA52PVNFo-LaJ-m2uhBDf_P3n88sW75tk",
  authDomain: "householdwithtypescript.firebaseapp.com",
  projectId: "householdwithtypescript",
  storageBucket: "householdwithtypescript.appspot.com",
  messagingSenderId: "894334447020",
  appId: "1:894334447020:web:9b8d1728163e6f6ce4de09",
  measurementId: "G-7R2NM7B5PV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
