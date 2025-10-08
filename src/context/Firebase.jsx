import React, { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
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

// 🧩 3. Create Context
const FirebaseContext = createContext(null);

// 🧩 4. Custom Hook (for easy access)
export const useFirebase = () => useContext(FirebaseContext);

// 🧩 5. Provider Component
export const FirebaseProvider = ({ children }) => {
  // ✅ Function to register a new user
  const registerUser = (email, password) =>
    firebaseCreateUserWithEmailAndPassword(firebaseAuth, email, password);

  // ✅ Function to sign in user
  const loginUser = (email, password) =>
    firebaseSignInWithEmailAndPassword(firebaseAuth, email, password);

  return (
    <FirebaseContext.Provider value={{ registerUser, loginUser }}>
      {children}
    </FirebaseContext.Provider>
  );
};
