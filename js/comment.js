// Identify the HTML element with the ID comment-submit, used to post a new comment
const submitCommentBtn = document.querySelector('#comment-submit');

//click event listener for the comment-submit button
submitCommentBtn.addEventListener('click', () => {
  // Get the text entered in the comment input field
  const commentText = document.querySelector('#comment-content').value;

  // this seends a POST request to the server to add the new comment
  fetch('/api/comments', {
    method: 'POST', // Use POST method to create a new comment
    body: JSON.stringify({ 
      content: commentText, // The text content of the new comment
      post_id: submitCommentBtn.dataset.pid // Post ID from the 'comment-submit' button's data attribute
    }),
    headers: { 'Content-Type': 'application/json' } // Specify that the request body is in JSON format
  })
  .then(response => {
    // Verify if the server's response indicates success
    if (response.ok) {
      // Redirect to the post page after successfully adding the comment
      document.location.replace(`/post/${submitCommentBtn.dataset.pid}`);
    } else {
      // lets the user know if there are issues
      alert('Unable to add comment. Please try again.');
    }
  })
  .catch(error => {
    // Logs any errors 
    console.error('Failed to add comment:', error);
  });
});


