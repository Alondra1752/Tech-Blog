// access the html to handle new posts 
const createPostButton = document.querySelector('#add-post');

// event listener to the 'createPostButton' element
createPostButton.addEventListener('click', (event) => {
  event.preventDefault(); // Stop the default action of the click (e.g., form submission or page refresh)

  
  const postContent = document.querySelector('#post-content').value; // Fetch the content for the new post
  const postTitle = document.querySelector('#post-title').value; // Fetch the title for the new post

  fetch(`/api/posts/`, {
    method: 'POST', // Use POST method to create a new post
    body: JSON.stringify({ 
      title: postTitle, // Title of the post to be created
      content: postContent, // Content of the post to be created
      user_id: createPostButton.dataset.uid // User ID from the button's data attribute
    }),
    headers: { 'Content-Type': 'application/json' } // Indicate that the request body is in JSON format
  })
  .then(response => {
    // Verify if the server's response indicates success
    if (response.ok) {
      response.json().then((data) => {
        // Redirect to the newly created post page
        document.location.replace(`/post/${data.id}`);
      });
    } else {
      // Let's the user if the post was not added 
      alert('Unable to add post. Please try again.');
    }
  })
  .catch(error => {
    // This handles and log any errors that occur during the request
    console.error('Failed to create post:', error);
  });
});



  
