const sequelize = require("../config/sequelize");

async function syncDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');

        await sequelize.sync({ alter: true }); // Sync all models with the database

        console.log('Models synced successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = syncDatabase;