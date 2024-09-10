// Import the Express router instance
const expressRouter = require('express').Router();

// Import various route modules
const apiRouteHandlers = require ('./index.js'); // Routes related to API endpoints
const homepageRoutes = require ('./homeRoutes.js'); // Routes for the homepage and general views
const userDashboardRoutes = require ('./dashboardRoutes.js'); // Routes for user dashboard interactions
const blogPostRoutes = require ('./comment.js'); // Routes for managing blog posts

// Setup routes for user comments
expressRouter.use('/comment', userCommentRoutes); 


// Setup routes for blog posts
expressRouter.use('/post', blogPostRoutes); 


// routes for the user dashboard
expressRouter.use('/dashboard', userDashboardRoutes); 


// routes for the homepage
expressRouter.use('/', homeRoutes); 


// Setup routes for API endpoints
expressRouter.use('/api', apiRouteHandlers); 


// Export the configured router for use in the main application
module.exports = expressRouter;

