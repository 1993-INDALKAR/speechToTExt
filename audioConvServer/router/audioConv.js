const express = require("express");
const data = require("../data");
const router = express.Router();
const xss = require("xss");

try {

    router.post("/", async (req, res) => {
        console.log(req.body);
        res.status(200).json({message:"its success audio"});
    });
}
catch (e) {

}

module.exports = router;