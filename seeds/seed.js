// Import the Sequelize instance configuration
const db = require('../config/connection');

// Import data seeding functions for various models
const loadUserData = require('./userData.json');
const loadCommentData = require('./commentData');
const loadPostData = require('./postData.json');

// Function to populate the database with all data
const populateDatabase = async () => {
  try {
    // Sync the database, dropping tables if they already exist
    await db.sync({ force: true });

    // Seed the user data
    await loadUserData();

    // Seed the post data
    await loadPostData();

    // Seed the comment data
    await loadCommentData();

    console.log('Seeding complete!');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    // Terminate the process after all operations
    process.exit(0);
  }
};

// Start the database seeding process
populateDatabase();



