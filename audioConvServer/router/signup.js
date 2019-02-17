const express = require("express");
const data = require("../data");
const router = express.Router();
const xss = require("xss");

try {

    router.post("/", async (req, res) => {
        const user = req.body;
        // console.log(user);
        let signup = {};

        var status = "";

        signup = await data.createUser(user);

        if (signup.hasOwnProperty("message")) {
            status = "400";
        }
        else {
            status = "200";
        }

        res.status(status).json(signup);
    });
}
catch (e) {

}

module.exports = router;