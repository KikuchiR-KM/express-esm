import express from "express";
import { StartSpeechSynthesisTaskCommand } from "@aws-sdk/client-polly";
import { pollyClient } from "../libs/pollyClient.js";



var router = express.Router();



/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send("TTS route Get");
});

// /buckets

router.post("/save-to-s3", async function(req, res, next){
    let text = req.body.text; 
    console.log(text)
    var params = {
        OutputFormat: "mp3",
        OutputS3BucketName: "<YOUR_BUCKET_NAME>",
        Text: "人間社会の進化に貢献する、新たな価値を創出し続ける企業へ", // 山名様のごあいさつ
        TextType: "text",
        VoiceId: "Mizuki", // 日本語は Mizuki さんか Takumi くん
        SampleRate: "24000", // mp3 では 8000, 16000, 22050, 24000 のいずれか
    };

    console.log("なんで？")
    res.send(text)
    
})


export { router as default };
