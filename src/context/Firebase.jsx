import React, { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
    signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
    signInWithPopup as firebaseSignInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
} from "firebase/auth";

// 🔥 1. Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDtt_A4Eh77N_Ah4abTak6CRqDEIUFOOX8",
    authDomain: "pet-store-9190c.firebaseapp.com",
    projectId: "pet-store-9190c",
    storageBucket: "pet-store-9190c.firebasestorage.app",
    messagingSenderId: "617791038829",
    appId: "1:617791038829:web:78c52d8cf91ce0080a6664",
};


// 🔥 2. Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

// ✅ Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// 🧩 3. Create Context
const FirebaseContext = createContext(null);

// 🧩 4. Custom Hook
export const useFirebase = () => useContext(FirebaseContext);

// 🧩 5. Provider Component
export const FirebaseProvider = ({ children }) => {
    // ✅ Register user
    const registerUser = (email, password) =>
        firebaseCreateUserWithEmailAndPassword(firebaseAuth, email, password);

    // ✅ Login user
    const loginUser = (email, password) =>
        firebaseSignInWithEmailAndPassword(firebaseAuth, email, password);

    // ✅ Google Sign-In
    const signInWithGoogle = () =>
        firebaseSignInWithPopup(firebaseAuth, googleProvider);



    // ✅ Monitor Auth State to finf user login or not

    const [user, setUser] = useState(null);
    useEffect(() => {
        onAuthStateChanged(firebaseAuth, user => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        })
    }, [])
    const isLoggedIn = user ? true : false;
    return (
        <FirebaseContext.Provider
            value={{ registerUser, loginUser, signInWithGoogle, isLoggedIn }}
        >
            {children}
        </FirebaseContext.Provider>
    );
};
