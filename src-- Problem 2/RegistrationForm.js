import React, { useState } from 'react';

const RegistrationForm = () => {
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, phoneNumber, password })
            });

            const responseData = await response.json();
            if (response.ok) {
                setMessage('Registration successful!');
                // Redirect or perform desired action upon successful registration
            } else {
                setMessage(responseData.error);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="container">
            <h2>User Registration</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br />
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input type="text" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required /><br />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br />
                <button type="submit">Register</button>
            </form>
            <div id="message">{message}</div>
        </div>
    );
};

export default RegistrationForm;
