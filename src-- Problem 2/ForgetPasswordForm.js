import React, { useState } from 'react';

const ForgetPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/auth/forget-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const responseData = await response.json();
            if (response.ok) {
                setMessage('Password reset link sent successfully!');
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
            <h2>Forget Password</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br />
                <button type="submit">Submit</button>
            </form>
            <div id="message">{message}</div>
        </div>
    );
};

export default ForgetPasswordForm;
