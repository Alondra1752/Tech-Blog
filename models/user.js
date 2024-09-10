// Import the required classes from Sequelize and bcrypt for hashing passwords
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');


class User extends Model {
 
  async validatePassword(plainTextPassword) {
    return bcrypt.compareSync(plainTextPassword, this.password);
  }
}

// Define the User model with Sequelize
User.init(
  {
    // Set up the 'id' field as an integer, ensuring it is non-nullable, acts as the primary key, and auto-increments
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Set up the 'username' field as a string, ensuring it is non-nullable and unique
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // Set up the 'password' field as a string, ensuring it is non-nullable and validating length constraints
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 100], 
      },
    },
  },
  {
   
    hooks: {
      async beforeCreate(userInstance) {
        userInstance.password = await bcrypt.hash(userInstance.password, 10);
        return userInstance;
      },
    },
    sequelize, // Provide the Sequelize instance to connect to the database
    timestamps: false, // Disable automatic timestamp fields (createdAt and updatedAt)
    underscored: true, // Use underscores in column names (e.g., `user_id` instead of `userId`)
  }
);

// Export the User model so it can be used throughout the application
module.exports = User;

