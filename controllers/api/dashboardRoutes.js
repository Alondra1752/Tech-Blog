// Import the necessary modules for routing and models
const expressRouter = require('express').Router(); // Instantiate a new router object from Express
const { User, Post, Comment } = require('../models'); // Import the models for User, Post, and Comment
const authenticate = require('../utils/authGuard'); // Import the middleware for authentication

// Handle GET requests to the dashboard route
expressRouter.get('/', authenticate, async (req, res) => {
  try {
    // Retrieve posts associated with the currently logged-in user
    const postsData = await Post.findAll({
      where: {
        user_id: req.session.uid, // Filter posts by user ID stored in the session
      },
      include: [{ 
        model: User, 
        attributes: ['username'] // Fetch the username attribute from the User model
      }]
    });

    // Convert the results into plain JSON objects
    const posts = postsData.map(post => post.toJSON());
    console.log(posts); // Output the posts to the console for debugging

    // Render the 'dashboard' view and pass the posts along with session status
    res.render('dashboard', {
      posts,
      loggedIn: req.session.loggedIn, // Pass login status to the view
      uid: req.session.uid // Include the user ID from the session in the response
    });
  } catch (error) {
    console.error('Error fetching posts:', error); // Log any errors that occur during the process
    res.status(500).json({ message: 'Internal Server Error' }); // Respond with a 500 status code for server errors
  }
});

// Export the configured router for use in the main application
module.exports = expressRouter;


