const express = require("express");
const data = require("../data");
const router = express.Router();
const xss = require("xss");
const fs = require("fs");
const path = require("path");
const fetch = require('node-fetch');
const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
const sleep = require('system-sleep');

try {

    router.get("/", async (req, res) => {
        // console.log(req.body.path);

        // let fileName = path.join(__dirname, "../public");
        // await fs.writeFileSync(req.body.path, fileName[0].buffer);
        // let blob = await fetch(req.body.path).then(r => r.blob());



        // let blob  = await fetch(req.body.path).then(r => r.blob()).then(blobFile => new File([fileName], "fileNameGoesHere", { type: "audio/mp3" }) );
        // console.log(blob);




        let speech_to_text = new SpeechToTextV1({
            iam_apikey: 'cDS1pRoI1-RN-nh9mzCFc_AoktOszgIiaT4XhfslXjAU',
            url: 'https://stream.watsonplatform.net/speech-to-text/api'
        });
        sleep(1000);
        let files = ['C:/Users/haris/Downloads/test.wav'];
        
        console.log("1");
        console.log(files[0]);
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
                else
                    // addText = await data.addText(transcript.results[0].alternatives[0].transcript);
                    console.log(transcript.results[0].alternatives[0].transcript);
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