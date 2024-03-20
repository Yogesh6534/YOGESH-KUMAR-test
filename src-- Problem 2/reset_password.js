document.getElementById('resetPasswordForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const data = {
      otp: formData.get('otp'),
      newPassword: formData.get('newPassword'),
      confirmPassword: formData.get('confirmPassword')
    };
  
    try {
      const response = await fetch('/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      const responseData = await response.json();
      if (response.ok) {
        document.getElementById('message').innerHTML = '<div class="success">Password reset successful!</div>';
      } else {
        document.getElementById('message').innerHTML = `<div class="error">${responseData.error}</div>`;
      }
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('message').innerHTML = '<div class="error">An error occurred. Please try again.</div>';
    }
  });
  