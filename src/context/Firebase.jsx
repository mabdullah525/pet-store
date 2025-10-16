import React, { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
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
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

// 🔹 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDtt_A4Eh77N_Ah4abTak6CRqDEIUFOOX8",
  authDomain: "pet-store-9190c.firebaseapp.com",
  projectId: "pet-store-9190c",
  storageBucket: "pet-store-9190c.firebasestorage.app",
  messagingSenderId: "617791038829",
  appId: "1:617791038829:web:78c52d8cf91ce0080a6664",
};

// 🔹 Firebase Initialization
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  // 🔹 Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // 🔹 Fetch user role
        const docRef = doc(firestore, "users", currentUser.uid);
        const userDoc = await getDoc(docRef);
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role);
        } else {
          setUserRole("buyer");
        }
      } else {
        setUser(null);
        setUserRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const isLoggedIn = !!user;

  // 🔹 Register (Email/Password)
  const registerUser = async (email, password, role = "buyer") => {
    const res = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    const uid = res.user.uid;

    await setDoc(doc(firestore, "users", uid), {
      email,
      role,
      createdAt: new Date(),
    });

    setUserRole(role);
    return res;
  };

  // 🔹 Login (Email/Password)
  const loginUser = async (email, password) => {
    const res = await signInWithEmailAndPassword(firebaseAuth, email, password);
    const uid = res.user.uid;

    const docRef = doc(firestore, "users", uid);
    const userDoc = await getDoc(docRef);
    if (userDoc.exists()) {
      setUserRole(userDoc.data().role);
    }

    return res;
  };

  // 🔹 Google Login
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(firebaseAuth, googleProvider);
    const user = result.user;

    const userRef = doc(firestore, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      const role =
        user.email === "muhammadabdullahweb005@gmail.com" ? "seller" : "buyer";

      await setDoc(userRef, {
        email: user.email,
        role,
        createdAt: new Date(),
      });

      setUserRole(role);
    } else {
      setUserRole(userDoc.data().role);
    }

    return result;
  };

  // 🔹 Logout
  const logoutUser = async () => {
    try {
      await signOut(firebaseAuth);
      setUser(null);
      setUserRole(null);
    } catch (error) {
      console.error("❌ Logout failed:", error);
    }
  };

  // 🔹 Cloudinary Upload
  const uploadImage = async (file) => {
    if (!file) return null;
    const cloudName = "dp0288fg2";
    const uploadPreset = "pet_store_upload";

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
      return data.secure_url;
    } catch (error) {
      console.error("❌ Cloudinary Upload Exception:", error);
      return null;
    }
  };

  // 🔹 Seller: Add Pet Listing
  const addPetListing = async (petData) => {
    if (!user || !petData.imageUrl) return false;
    try {
      await addDoc(collection(firestore, "petListings"), {
        ...petData,
        userId: user.uid,
        createdAt: new Date(),
      });
      return true;
    } catch (error) {
      console.error("❌ Firestore Add Error:", error);
      return false;
    }
  };

  // 🔹 Seller: Get My Listings
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

  // 🔹 Buyer: Get My Orders
  const getMyOrders = async () => {
    if (!user) return [];
    const q = query(collection(firestore, "orders"), where("buyerId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };

  // 🔹 Buyer: Add to Cart
  const addToCart = async (cartItem) => {
    try {
      await addDoc(collection(firestore, "cartItems"), cartItem);
      return true;
    } catch (error) {
      console.error("❌ Error adding to cart:", error);
      return false;
    }
  };

  // 🔹 Create Order (Buy Now)
  const createOrder = async (orderData) => {
    try {
      await addDoc(collection(firestore, "orders"), {
        ...orderData,
        status: "pending",
        createdAt: serverTimestamp(),
      });
      alert("✅ Order placed successfully! 🐾");
      return true;
    } catch (error) {
      console.error("❌ Error placing order:", error);
      return false;
    }
  };

  // 🔹 Get User Role
  const getUserRole = async (uid) => {
    try {
      const docRef = doc(firestore, "users", uid);
      const userDoc = await getDoc(docRef);
      return userDoc.exists() ? userDoc.data().role : null;
    } catch (error) {
      console.error("❌ Error getting user role:", error);
      return null;
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        firestore,
        registerUser,
        loginUser,
        signInWithGoogle,
        logoutUser,
        isLoggedIn,
        user,
        userRole,
        uploadImage,
        addPetListing,
        getMyListings,
        getMyOrders,
        addToCart,
        createOrder,
        getUserRole,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
