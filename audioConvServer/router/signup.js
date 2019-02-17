const express = require("express");
const data = require("../data");
const router = express.Router();
const xss = require("xss");

try {

    router.post("/", async (req, res) => {
        console.log(req.body);
    });
}
catch (e) {

}

module.exports = router;