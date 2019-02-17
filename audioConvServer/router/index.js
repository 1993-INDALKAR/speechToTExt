const path = require("path");
const express = require("express");
const router = express.Router();
const signupRoutes = require("./signup");
const loginRoutes = require("./login");
const audioConvRoutes = require("./audioConv");

try {
    const constructorMethod = app => {
               

        app.use("/signup", signupRoutes);
        
        app.use("/login", loginRoutes);
        
        app.use("/audioConv", audioConvRoutes);

    }

    module.exports = constructorMethod;
}
catch (e) {
    throw console.log("Problem occured in Displaying Page.");
}

