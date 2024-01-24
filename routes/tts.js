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
    console.log("なんで？")
    res.send(text)
    
})


export { router as default };
