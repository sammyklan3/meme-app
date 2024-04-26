const express = require('express');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const cors = require('cors');
const path = require('path');
const passport = require("./config/passport-config");
const syncDatabase = require("./middleware/syncDb");
const app = express();

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers for each CPU core
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    // Listen for worker exit event
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
    });
} else {
    console.log(`Worker ${process.pid} started`);

    // Show received requests
    app.use((req, res, next) => {
        console.log(`Request received at ${new Date()}`);
        next();
    });

    // Middleware
    app.use(express.static(path.join(__dirname, "public")));
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(passport.initialize());

    app.use("/api", require("./routes/routes"));

    syncDatabase();


    // App listening
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
}