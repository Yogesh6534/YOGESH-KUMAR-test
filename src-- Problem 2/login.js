document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const data = {
      email: formData.get('email'),
      password: formData.get('password')
    };
  
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      const responseData = await response.json();
      if (response.ok) {
        document.getElementById('message').innerHTML = '<div class="success">Login successful!</div>';
        // Redirect or perform desired action upon successful login
      } else {
        document.getElementById('message').innerHTML = `<div class="error">${responseData.error}</div>`;
      }
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('message').innerHTML = '<div class="error">An error occurred. Please try again.</div>';
    }
  });
  