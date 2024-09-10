// Select the HTML element with the ID 'signup-submit' (button to submit the signup form)
const signupButton = document.querySelector('#signup-submit');

// Attach a click event listener to the 'signupButton' element
signupButton.addEventListener('click', async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  // Retrieve the values from the input fields for the username and password
  const username = document.querySelector('#signup-username').value.trim(); // Get the username from the signup form
  const password = document.querySelector('#signup-password').value.trim(); // Get the password from the signup form

  if (username && password) {
    try {
      // Make a POST request to the server to register the new user
      const response = await fetch('/api/users/signup', {
        method: 'POST', // Use POST method for user registration
        body: JSON.stringify({ 
          username, // Include the username in the request body
          password // Include the password in the request body
        }),
        headers: { 'Content-Type': 'application/json' } // Set the content type to JSON
      });

      // Check if the server responded with a successful status
      if (response.ok) {
        // Redirect the user to the home page upon successful registration
        document.location.replace('/');
      } else {
        // Notify the user if the signup process encountered an issue
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      // Log any errors that occur during the fetch request
      console.error('Error during signup:', error);
      alert('An error occurred while attempting to sign up.');
    }
  } else {
    // Alert the user if username or password fields are empty
    alert('Please fill out both the username and password fields.');
  }
});

