// Import required modules
const expressRouter = require('express').Router(); // Create a new router instance
const { Post, User, Comment } = require('../models'); // Load models for Post, User, and Comment
const authenticate = require('../utils/authGuard'); // Load authentication middleware

// Handle GET requests for the homepage, which shows all posts
expressRouter.get('/', async (req, res) => {
    try {
        // Retrieve all posts along with associated user details
        const postsList = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'], // Only include username from the User model
                },
            ],
        });

        // Transform the posts data into plain JSON format
        const posts = postsList.map(post => post.toJSON());
        console.log(posts); // Output posts data to the console for debugging
        // Render the 'homepage' template with posts and session login status
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn,
        });
    } catch (error) {
        console.error('Error fetching posts:', error); // Log error details for debugging
        res.status(500).json({ message: 'Failed to retrieve posts' }); // Return a 500 status code for server errors
    }
});

// Handle GET requests for viewing a single post by its ID
expressRouter.get('/Post/:id', async (req, res) => {
    try {
        // Fetch the post by its ID along with its associated comments
        const postDetails = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'text',
                        'user_id',
                        'created_at',
                    ],
                },
            ],
        });

        // Convert the fetched post details to plain JSON
        const post = postDetails.get({ plain: true });
        // Render the 'post' view with the post details and session login status
        res.render('post', { post, loggedIn: req.session.loggedIn });
    } catch (error) {
        console.error('Error retrieving post:', error); // Log error details for debugging
        res.status(500).json({ message: 'Failed to retrieve post' }); // Return a 500 status code for server errors
    }
});

// Handle GET requests for the login page
expressRouter.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        // Redirect to the homepage if the user is already logged in
        res.redirect('/');
        return;
    }
    // Render the login page if the user is not logged in
    res.render('login');
});

// Handle GET requests to logout and redirect to homepage
expressRouter.get("/js/logout.js", (req, res) => {
    req.session.destroy(); // End the user session
    res.redirect("/"); // Redirect to the homepage after logging out
});

// Export the router for use in other parts of the application
module.exports = expressRouter;

