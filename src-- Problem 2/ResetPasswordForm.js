import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ResetPasswordForm = () => {
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const { token } = useParams(); // Assuming token is passed as a URL parameter

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const data = { otp, newPassword, confirmPassword };
            // Add token to the data if needed
            // data.token = token;

            const response = await fetch(`/auth/reset-password/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();
            if (response.ok) {
                setMessage('Password reset successful!');
                // Redirect or perform desired action upon successful password reset
            } else {
                setMessage(responseData.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="otp">OTP:</label>
            <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
            />

            <label htmlFor="newPassword">New Password:</label>
            <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />

            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button type="submit">Reset Password</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default ResetPasswordForm;
