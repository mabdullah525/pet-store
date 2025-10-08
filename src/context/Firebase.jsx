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

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    query,
    where,
} from "firebase/firestore";

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
const firestore = getFirestore(firebaseApp);

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
    const signInWithGoogle = () =>
        firebaseSignInWithPopup(firebaseAuth, googleProvider);

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
        const uploadPreset = "petstore_uploads"; // ⚙️ Cloudinary me banana hoga

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
            return data.secure_url;
        } catch (error) {
            console.error("❌ Cloudinary Upload Error:", error);
            return null;
        }
    };

    // ✅ Add New Pet Listing to Firestore
    const addPetListing = async (petData) => {
        try {
            if (!user) throw new Error("User not logged in");

            const docRef = await addDoc(collection(firestore, "petListings"), {
                ...petData,
                userId: user.uid,
                createdAt: new Date(),
            });

            console.log("🐾 Pet Listing Added:", docRef.id);
            return true;
        } catch (error) {
            console.error("❌ Error adding pet listing:", error);
            return false;
        }
    };

    // ✅ Fetch All Pets (for Dashboard)
    const getAllPets = async () => {
        const snapshot = await getDocs(collection(firestore, "petListings"));
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    };

    // ✅ Fetch Pets by Logged-in User (for My Listings)
    const getMyPets = async () => {
        if (!user) return [];
        const q = query(
            collection(firestore, "petListings"),
            where("userId", "==", user.uid)
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    };

    return (
        <FirebaseContext.Provider
            value={{
                registerUser,
                loginUser,
                signInWithGoogle,
                isLoggedIn,
                user,
                uploadImage,
                addPetListing,
                getAllPets,
                getMyPets,
            }}
        >
            {children}
        </FirebaseContext.Provider>
    );
};
