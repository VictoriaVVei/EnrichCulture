import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAZZoFAIMlK239MzShXSIfzNrmMgR0QFqE",
    authDomain: "enrichculture-4cc43.firebaseapp.com",
    projectId: "enrichculture-4cc43",
    storageBucket: "enrichculture-4cc43.appspot.com",
    messagingSenderId: "586640821242",
    appId: "1:586640821242:web:2d02c724c97804e0463243",
    measurementId: "G-BFC7085GFN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const cloudStore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);