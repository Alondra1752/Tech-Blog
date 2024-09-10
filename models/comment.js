// Import essential classes and functions from Sequelize
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

// Define the Comment model by extending Sequelize's Model
class Comment extends Model {}

// Set up the Comment model with Sequelize
Comment.init(
  {
    content: {
      type: DataTypes.TEXT, // TEXT type for handling potentially lengthy comment content
      allowNull: false, 
    },
    // Define the 'user_id' field as an integer and require it to be present
    user_id: {
      type: DataTypes.INTEGER, // INTEGER type to link to a User
      allowNull: false, 
    },
    // Define the 'post_id' field as an integer and require it to be present
    post_id: {
      type: DataTypes.INTEGER, // INTEGER type to link to a Post
      allowNull: false, 
    },
  
    created_at: {
      type: DataTypes.DATE, // DATE type for capturing creation timestamp
      defaultValue: DataTypes.NOW, // Sets default value to the current date and time
    },
  
    updated_at: {
      type: DataTypes.DATE, // DATE type for capturing last updated timestamp
      defaultValue: DataTypes.NOW, // Sets default value to the current date and time
    },
  },
  {
    sequelize, // Provide the Sequelize instance to manage database interactions
    modelName: 'Comment', // Name the model 'Comment'
    tableName: 'Comment', // Define the table name as 'Comment'
    timestamps: true, // Automatically manage 'created_at' and 'updated_at' fields
  }
);

// Export the Comment model for use across the application
module.exports = Comment;