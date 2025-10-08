import React from "react";
import { useFirebase } from "../context/Firebase";

const Profile = () => {
    const { user, logoutUser } = useFirebase();

    if (!user) return <p>Please login to view your profile.</p>;

    return (
        <div className="profile-card p-4 bg-white rounded shadow-md w-80">
            <h2 className="text-xl font-bold mb-2">My Profile</h2>
            {user.photoURL && (
                <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-20 h-20 rounded-full mb-2"
                />
            )}
            <p><strong>Name:</strong> {user.displayName || "N/A"}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>UID:</strong> {user.uid}</p>
            <button
                onClick={logoutUser}
                className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
                Logout
            </button>
        </div>
    );
};

export default Profile;
