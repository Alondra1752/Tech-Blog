// Middleware to ensure user is authenticated
const checkAuthentication = (req, res, next) => {
    // Check if the user is logged in based on session
    if (!req.session.isAuthenticated) {
      // Redirect to login page if not authenticated
      res.redirect('/signin');
      return;
    }
    
    // Optional: Log the user ID for debugging
    console.log(`User ID: ${req.session.userId} is logged in`);
  
    // Proceed to the next middleware or route handler
    next();
  };
  
  module.exports = checkAuthentication;
  