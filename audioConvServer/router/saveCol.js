const express = require("express");
const data = require("../data");
const router = express.Router();
const xss = require("xss");

try {

    router.post("/", async (req, res) => {
        const colleagues = JSON.stringify(req.body);
        // const cookie = req.cookies.name;
        console.log("colleagues"+JSON.stringify(colleagues) );
        let signup = {};

        var status = "";

        signup = await data.saveColleagues(colleagues);

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