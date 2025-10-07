import React from "react";
import { createContext, useContext } from "react"; // 1. Import createContext from React
const FirebaseContext = createContext(null); // 2. Create the context with a default value of null
import { initializeApp } from "firebase/app"; // Import the Firebase SDK

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDtt_A4Eh77N_Ah4abTak6CRqDEIUFOOX8",
    authDomain: "pet-store-9190c.firebaseapp.com",
    projectId: "pet-store-9190c",
    storageBucket: "pet-store-9190c.firebasestorage.app",
    messagingSenderId: "617791038829",
    appId: "1:617791038829:web:78c52d8cf91ce0080a6664"
};

const firebaseApp = initializeApp(firebaseConfig); // Initialize Firebase

export const useFirebase = () => useContext(FirebaseContext); // 3. Create a custom hook to use the context

export const FirebaseProvider = ({ children }) => {
    return (
        <FirebaseContext.Provider value={{ /* You can add Firebase-related values here */ }}>
            {children}
        </FirebaseContext.Provider>
    );
};
