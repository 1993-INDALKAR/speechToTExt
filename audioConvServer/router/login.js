const express = require("express");
const data = require("../data");
const router = express.Router();
const xss = require("xss");

try {

    router.post("/", async (req, res) => {
        // console.log(req.body);
        let userDetail = req.body;
        let status;
        const cookieName = req.body.firstName
        // res.cookie("name",cookieName,{ maxAge: 900000, httpOnly: true });



        console.log(res.cookie);

        let checkUser = await data.checkUser(userDetail);

        // console.log(checkUser.message);

        if (checkUser.hasOwnProperty("message")) {
            status = 400;
        }
        else {
            status = 200;
            // res.cookie('name', `${checkUser._id}`);
            // console.log(checkUser._id);
        }



        data.setCookie(checkUser._id);
        // console.log(checkUser.message);
        res.status(status).json(checkUser);
    });
}
catch (e) {

}

module.exports = router;