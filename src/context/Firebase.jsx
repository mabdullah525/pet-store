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
    const [user, setUser] = useState(null);

    // ✅ Register user
    const registerUser = (email, password) =>
        firebaseCreateUserWithEmailAndPassword(firebaseAuth, email, password);

    // ✅ Login user
    const loginUser = (email, password) =>
        firebaseSignInWithEmailAndPassword(firebaseAuth, email, password);

    // ✅ Google Sign-In
    const signInWithGoogle = () => firebaseSignInWithPopup(firebaseAuth, googleProvider);

    // ✅ Check login state
    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (currentUser) => {
            setUser(currentUser || null);
        });
    }, []);

    const isLoggedIn = !!user;

    // ✅ Cloudinary Upload Function
    const uploadImage = async (file) => {
        if (!file) return null;

        const cloudName = "dp0288fg2"; // ⚙️ apna cloud name
        const uploadPreset = "petstore_uploads"; // ⚙️ ye Cloudinary dashboard me banana hoga

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await response.json();
            console.log("✅ Uploaded to Cloudinary:", data);
            return data.secure_url; // image ka final URL
        } catch (error) {
            console.error("❌ Cloudinary Upload Error:", error);
            return null;
        }
    };

    return (
        <FirebaseContext.Provider
            value={{
                registerUser,
                loginUser,
                signInWithGoogle,
                isLoggedIn,
                user,
                uploadImage, // ✅ Added here
            }}
        >
            {children}
        </FirebaseContext.Provider>
    );
};
