const { DataTypes, Model } = require('sequelize');
const sequelize = require("../config/sequelize"); // Import the initialized Sequelize instance

class Token extends Model { }

Token.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tokenValue: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    modelName: "Token",
    tableName: "tokens", // Set the table name to 'tokens'
    timestamps: false,
});

module.exports = Token;
