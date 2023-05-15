import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage,ref } from "firebase/storage";
import 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyAULDV5VXPbKaPfMd0EJmZ7oSiV8Y5qqSU",
    authDomain: "sspms-f3ca1.firebaseapp.com",
    projectId: "sspms-f3ca1",
    storageBucket: "sspms-f3ca1.appspot.com",
    messagingSenderId: "589343985811",
    appId: "1:589343985811:web:242e2677278de914877d66"
  };

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth(app)
export const storage = getStorage(app);
export const storageRef = ref(storage)
