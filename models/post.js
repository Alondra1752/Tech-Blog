// Import the necessary classes and functions from Sequelize
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Post extends Model {}

Post.init(
  {
   
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define the 'title' field as a string and make sure it's not empty
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users', // References the 'users' model
        key: 'id', // Column in the 'users' model to reference
      },
    },
  },
  {
    sequelize, 
    underscored: true, 
  }
);

// Export the Post model so it can be used in other parts of the application
module.exports = Post;


