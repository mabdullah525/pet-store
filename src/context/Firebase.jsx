import React, { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
    signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
    signInWithPopup as firebaseSignInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    query,
    where,
} from "firebase/firestore";

// 🔥 Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDtt_A4Eh77N_Ah4abTak6CRqDEIUFOOX8",
    authDomain: "pet-store-9190c.firebaseapp.com",
    projectId: "pet-store-9190c",
    storageBucket: "pet-store-9190c.firebasestorage.app",
    messagingSenderId: "617791038829",
    appId: "1:617791038829:web:78c52d8cf91ce0080a6664",
};

// 🔥 Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const logoutUser = () => signOut(firebaseAuth);

// ✅ Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// 🧩 Create Context
const FirebaseContext = createContext(null);

// 🧩 Custom Hook
export const useFirebase = () => useContext(FirebaseContext);

// 🧩 Provider Component
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

    // ✅ Monitor user state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
            setUser(currentUser || null);
        });
        return () => unsubscribe();
    }, []);

    const isLoggedIn = !!user;

    // ✅ Cloudinary Image Upload
    const uploadImage = async (file) => {
        if (!file) {
            console.warn("❌ No file selected for upload");
            return null;
        }

        const cloudName = "dp0288fg2"; // your Cloudinary cloud name
        const uploadPreset = "pet_store_upload"; // ← exact preset from Cloudinary

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                { method: "POST", body: formData }
            );
            const data = await response.json();

            if (data.error) {
                console.error("❌ Cloudinary Upload Error:", data.error);
                return null;
            }

            console.log("✅ Uploaded to Cloudinary:", data.secure_url);
            return data.secure_url;
        } catch (error) {
            console.error("❌ Cloudinary Upload Exception:", error);
            return null;
        }
    };

    // ✅ Add Pet Listing (safe Firestore write)
    const addPetListing = async (petData) => {
        if (!user) {
            console.error("❌ User not logged in!");
            return false;
        }

        // Ensure imageUrl exists before adding
        if (!petData.imageUrl) {
            console.error("❌ imageUrl is missing. Upload failed?");
            return false;
        }

        try {
            await addDoc(collection(firestore, "petListings"), {
                ...petData,
                userId: user.uid,
                createdAt: new Date(),
            });
            console.log("✅ Pet added to Firestore!");
            return true;
        } catch (error) {
            console.error("❌ Firestore Add Error:", error);
            return false;
        }
    };

    // ✅ Get Listings for Current User
    const getMyListings = async () => {
        if (!user) return [];
        try {
            const q = query(
                collection(firestore, "petListings"),
                where("userId", "==", user.uid)
            );
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
        } catch (error) {
            console.error("❌ Fetch Listings Error:", error);
            return [];
        }
    };

    return (
        <FirebaseContext.Provider
            value={{
                registerUser,
                loginUser,
                signInWithGoogle,
                logoutUser, 
                isLoggedIn,
                user,
                uploadImage,
                addPetListing,
                getMyListings,
            }}
        >
            {children}
        </FirebaseContext.Provider>

    );
};
