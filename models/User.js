const { DataTypes, Model } = require('sequelize');
const sequelize = require("../config/sequelize"); // Import the initialized Sequelize instance
const Token = require("./Token");

class User extends Model { }

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isNumeric: true,
    },
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: "users", // Set the table name to 'users'
  timestamps: false,
});

// Define associations
User.hasMany(Token, { onDelete: 'CASCADE' }); // When a user is deleted, associated tokens are also deleted

// Sequelize hook to handle the deletion of associated tokens when a user record is deleted
User.addHook('beforeDestroy', (user, options) => {
  return Token.destroy({ where: { UserId: user.userId } });
});


module.exports = User;