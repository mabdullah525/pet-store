import React, { useState } from 'react';
import { useFirebase } from '../context/Firebase.jsx';

const Register = () => {
    const firebase = useFirebase(); // Use the custom hook to access Firebase context
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Signing up with:', email);
        try {
            const result = await firebase.registerUser(email, password);
            console.log('User created successfully!', result);
        } catch (error) {
            console.error('Error creating user:', error.message);
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit} className="register-form">
                <h2 className="form-title">Create Your Account 🐾</h2>

                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>

                <button type="submit" className="submit-btn">
                    Create Account
                </button>
            </form>
        </div>
    );
};

export default Register;
