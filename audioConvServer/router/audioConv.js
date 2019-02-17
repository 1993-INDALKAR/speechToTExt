const express = require("express");
const data = require("../data/dataLayerFiles");
const dataUser = require("../data");
const router = express.Router();
const xss = require("xss");
const fs = require("fs");
const path = require("path");
const fetch = require('node-fetch');
const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
const sleep = require('system-sleep');
const mongoCollections = require("../setting/mongoCollection");
const users = mongoCollections.users;
const nodemailer = require('nodemailer');
// const getEmailData = require('');

try {

    router.get("/", async (req, res) => {
        // console.log(req.body.path);
        let text = "";
        // let fileName = path.join(__dirname, "../public");
        // await fs.writeFileSync(req.body.path, fileName[0].buffer);
        // let blob = await fetch(req.body.path).then(r => r.blob());



        // let blob  = await fetch(req.body.path).then(r => r.blob()).then(blobFile => new File([fileName], "fileNameGoesHere", { type: "audio/mp3" }) );
        // console.log(blob);




        let speech_to_text = new SpeechToTextV1({
            iam_apikey: 'cDS1pRoI1-RN-nh9mzCFc_AoktOszgIiaT4XhfslXjAU',
            url: 'https://stream.watsonplatform.net/speech-to-text/api'
        });
        sleep(500);
        let files = ['C:/Users/haris/Downloads/test.wav'];

        // console.log("1");
        // console.log(files[0]);
        for (let file in files) {
            let params = {
                audio: fs.createReadStream(files[file]),
                content_type: 'audio/wav',
                timestamps: true,
                word_alternatives_threshold: 0.9,
                keywords: ['colorado', 'tornado', 'tornadoes'],
                keywords_threshold: 0.5
            }
            console.log("params" + params);
            speech_to_text.recognize(params, async (error, transcript) => {
                if (error)
                    console.log('Error:', error);
                else {
                    text = transcript.results[0].alternatives[0].transcript;
                }
                // addText = await data.addText(transcript.results[0].alternatives[0].transcript);

                let addText = await data.addText(text);
                console.log(addText);

                let userId = await dataUser.getCookie();

                let user = await dataUser.getUser(userId);
                var usersemail = user.email;
                var userpass = user.password;

                let colleagues = user.colleagues;

                let array=[];

                colleagues.forEach(element => {
                    array.push(element.email);
                });

                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: usersemail,
                        pass: userpass
                    }
                });

                var mailOptions = {
                    from: usersemail,
                    to: array,
                    subject: 'New meeting file.',
                    text: text
                };

                transporter.sendMail(mailOptions, function(error, info){
                    if(error){
                        console.log(error);
                    } else {
                        console.log('Email SENT.....');
                    }
                });



                res.status(200).json({ message: "its success audio" });

                

            });
        }



        // res.status(200).json({ message: "its success audio" });
    });
}
catch (e) {
    console.log(e);
}

module.exports = router;