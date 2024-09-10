// Import the models for User, Post, and Comment
const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');

// Each Post can be associated with multiple Comments
Post.hasMany(Comment, {
  foreignKey: 'post_id', // The column in Comment that links to Post
  onDelete: 'CASCADE', // If a Post is removed, its associated Comments are also deleted
});

// Each Comment is linked to a single Post
Comment.belongsTo(Post, {
  foreignKey: 'post_id', // The column in Comment that links back to Post
});

// A single User can create many Posts
User.hasMany(Post, {
  foreignKey: 'user_id', // The column in Post that refers to User
  onDelete: 'CASCADE', // If a User is removed, all their Posts are deleted too
});

// Each Post is associated with one User
Post.belongsTo(User, {
  foreignKey: 'user_id', // The column in Post that references User
});

User.hasMany(Comment, {
  foreignKey: 'user_id', // The column in Comment that points to User
  onDelete: 'CASCADE', // If a User is deleted, their Comments will also be deleted
});
// Each Comment is authored by a single User
Comment.belongsTo(User, {
  foreignKey: 'user_id', // The column in Comment that refers to User
});

// Export the models for use throughout the application
module.exports = { User, Post, Comment };