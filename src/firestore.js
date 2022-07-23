import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';

const app = initializeApp({
    apiKey: "AIzaSyAx5PEFdFrP1Rya_Y7xgsu78xZfG-dMlso",
    authDomain: "xcamp-select.firebaseapp.com",
    projectId: "xcamp-select",
    storageBucket: "xcamp-select.appspot.com",
    messagingSenderId: "838699332775",
    appId: "1:838699332775:web:5858db7130eec9c325d782"
});

export const db = getFirestore(app);