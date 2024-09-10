// Function to handle the login form submission asynchronously
const handleLoginFormSubmission = async (event) => {
    event.preventDefault(); // Stop the form from performing its default submission
  
    // Extract and trim the values from the username and password fields
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    // Proceed only if both username and password are provided
    if (username && password) {
      try {
        // Make a POST request to the login endpoint with the username and password
        const response = await fetch('/api/users/login', {
          method: 'POST', // Use POST method to send login details
          body: JSON.stringify({ username, password }), // Send credentials as a JSON object
          headers: { 'Content-Type': 'application/json' }, // Define the content type as JSON
        });
  
        // Verify if the login was successful based on server response
        if (response.ok) {
          // Redirect to the main page on successful login
          document.location.replace('/');
        } else {
          // Notify the user of a failed login attempt
          alert('Login attempt unsuccessful.');
        }
      } catch (error) {
        // Log and alert if an error occurs during the login process
        console.error('Login error:', error);
        alert('An unexpected error occurred while logging in.');
      }
    }
  };
  
  // Function to handle the signup form submission asynchronously
  const handleSignupFormSubmission = async (event) => {
    event.preventDefault(); // Prevent the form from the default submission action
  
    // Extract and trim the values from the signup username and password fields
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    // Proceed only if both fields have values
    if (username && password) {
      try {
        // Make a POST request to the signup endpoint with the provided details
        const response = await fetch('/api/users', {
          method: 'POST', // Use POST method to send signup details
          body: JSON.stringify({ username, password }), // Send details as JSON
          headers: { 'Content-Type': 'application/json' }, // Set the request content type to JSON
        });
  
        // Check if the signup was successful based on server response
        if (response.ok) {
          // Redirect to the home page upon successful signup
          document.location.replace('/');
        } else {
          // Inform the user of a failed signup attempt
          alert('Signup was unsuccessful.');
        }
      } catch (error) {
        // Log and alert if an error occurs during the signup process
        console.error('Signup error:', error);
        alert('An unexpected error occurred during signup.');
      }
    }
  };
  
  // Attach the login form submission handler to the login form
  document
    .querySelector('.login-form')
    .addEventListener('submit', handleLoginFormSubmission);
  
  // Attach the signup form submission handler to the signup form
  document
    .querySelector('.signup-form')
    .addEventListener('submit', handleSignupFormSubmission);

    
    