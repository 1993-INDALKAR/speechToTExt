const express = require("express");
const data = require("../data");
const router = express.Router();
const xss = require("xss");

try {

    router.post("/", async (req, res) => {
        // console.log(req.body);
        let userDetail = req.body;
        let status;

        // console.log(user);

        let checkUser = await data.checkUser(userDetail);

        console.log(checkUser);

        if (checkUser.hasOwnProperty("message")) {
            status = 400;
        }
        else {
            status = 200;
        }

        res.status(status).json(checkUser);
    });
}
catch (e) {

}

module.exports = router;