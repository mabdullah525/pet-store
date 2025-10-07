import React from 'react'

const Register = () => {
    return (
        <div className="register-container">
            <form className="register-form">
                <h2 className="form-title">Create Your Account 🐾</h2>

                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                       
                    />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                       
                    />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input
                        type="text"
                        name="address"
                        placeholder="Your city or area"
                        
                    />
                </div>


                <button type="submit" className="submit-btn">
                    Register
                </button>
            </form>
        </div>
    )
}

export default Register