document.addEventListener('DOMContentLoaded', () => {
    
    const commentButton = document.querySelector('#add-comment'); // Button for adding comments
    const postEditButton = document.querySelector('#edit-post'); // Button for editing posts
    const postDeleteButton = document.querySelector('#delete-post'); // Button for deleting posts
  
    
    if (commentButton) {
      commentButton.addEventListener('click', () => {
        // Navigates to the comment page 
        window.location.replace(`/comment/${commentButton.dataset.pid}`);   
      });
    }

    if (postEditButton) {
      postEditButton.addEventListener('click', () => {
        // Redirect to the post edit page 
        window.location.replace(`/post/edit/${postEditButton.dataset.pid}`);   
      });
    }
  
    
    if (postDeleteButton) {
      postDeleteButton.addEventListener('click', async () => {
      
        const id = postDeleteButton.dataset.pid;
  
        // user can confirm before deleting 
        if (confirm('Are you sure you want to remove this post?')) {
          try {
            // this removes the post 
            const response = await fetch(`/api/posts/${id}`, {
              method: 'DELETE',
            });
  
            // this will verify if the post has been removed successfully 
            if (response.ok) {
              alert('Post successfully removed');
              // this redirects the user to the home page or another specified page
              window.location.replace('/'); 
            } else {
              // Parse and display the error message if the deletion failed
              const data = await response.json();
              alert(`Deletion failed: ${data.message}`);
            }
          } catch (error) {
            // Handle any errors that occur during the fetch request
            console.error('Failed to delete the post:', error);
          }
        }
      });
    }
  });

  
