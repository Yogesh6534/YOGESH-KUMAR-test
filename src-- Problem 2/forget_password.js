document.getElementById('forgetPasswordForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const data = {
      email: formData.get('email')
    };
  
    try {
      const response = await fetch('/auth/forget-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      const responseData = await response.json();
      if (response.ok) {
        document.getElementById('message').innerHTML = '<div class="success">Password reset link sent successfully!</div>';
      } else {
        document.getElementById('message').innerHTML = `<div class="error">${responseData.error}</div>`;
      }
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('message').innerHTML = '<div class="error">An error occurred. Please try again.</div>';
    }
  });
  