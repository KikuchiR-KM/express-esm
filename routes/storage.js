import express from "express";
import {ListBucketsCommand, S3Client, ListObjectsV2Command} from "@aws-sdk/client-s3";
import { NodeHttpHandler } from "@aws-sdk/node-http-handler";
import { ProxyAgent } from "proxy-agent";

const agent = new ProxyAgent();
const client = new S3Client({
  region: "ap-southeast-2",
  requestHandler: new NodeHttpHandler({
    httpAgent: agent,
    httpsAgent: agent,
  }),
});

var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// /buckets

router.get("/buckets", async function(req, res, next){
  const command = new ListBucketsCommand({});

  try {
    const { Owner, Buckets } = await client.send(command);
    console.log(
      `${Owner.DisplayName} owns ${Buckets.length} bucket${
        Buckets.length === 1 ? "" : "s"
      }:`,
    );
    console.log(`${Buckets.map((b) => ` • ${b.Name}`).join("\n")}`);
    res.send(JSON.stringify(Buckets));
  } catch (err) {
    console.error(err);
    res.send('Error: ${err}')
  }
})

router.get("/buckets/:bucketName/files", async function(req, res, next){
    const command = new ListObjectsV2Command({
      Bucket:  req.params.bucketName,
      // The default and maximum number of keys returned is 1000. This limits it to
      // one for demonstration purposes.
      MaxKeys: 1,
    });

    try {
      let isTruncated = true;

      console.log("Your bucket contains the following objects:\n");
      let contents = "";

      while (isTruncated) {
        const { Contents, IsTruncated, NextContinuationToken } =
          await client.send(command);
        const contentsList = Contents.map((c) => ` • ${c.Key}`).join("</br>");
        contents += contentsList + "</br>";
        isTruncated = IsTruncated;
        command.input.ContinuationToken = NextContinuationToken;
      }
      console.log(contents);
      res.send(contents);
    } catch (err) {
      console.error(err);
      res.send('Error: ${err}')
    }
})


export { router as default };
