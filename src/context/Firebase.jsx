import { createContext } from "react"; // 1. Import createContext from React
const FirebaseContext = createContext(null); // 2. Create the context with a default value of null

export const FirebaseProvider = ({ children }) => {
    return (
        <FirebaseContext.Provider value={{ /* You can add Firebase-related values here */ }}>
            {children}
        </FirebaseContext.Provider>
    );
};
