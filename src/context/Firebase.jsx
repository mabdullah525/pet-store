import React from "react"; 
import { createContext, useContext } from "react"; // 1. Import createContext from React
const FirebaseContext = createContext(null); // 2. Create the context with a default value of null
export const useFirebase = () => useContext(FirebaseContext); // 3. Create a custom hook to use the context

export const FirebaseProvider = ({ children }) => {
    return (
        <FirebaseContext.Provider value={{ /* You can add Firebase-related values here */ }}>
            {children}
        </FirebaseContext.Provider>
    );
};
