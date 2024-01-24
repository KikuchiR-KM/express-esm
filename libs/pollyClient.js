// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/*
ABOUT THIS NODE.JS EXAMPLE: This example works with the AWS SDK for JavaScript version 3 (v3),
which is available at https://github.com/aws/aws-sdk-js-v3. This example is in the 'AWS SDK for JavaScript v3 Developer Guide' at
https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started-nodejs.html.

Purpose:
pollyClient.js is a helper function that creates an Amazon Polly service client.

Inputs (replace in code):
- REGION

*/
// snippet-start:[polly.JavaScript.createclientv3]
import { PollyClient } from "@aws-sdk/client-polly";
import { NodeHttpHandler } from "@aws-sdk/node-http-handler";
import { ProxyAgent } from "proxy-agent";
// Set the AWS Region.
const REGION = "ap-northeast-1"; //e.g. "us-east-1"
// Create an Amazon S3 service client object.
const agent = new ProxyAgent();
const pollyClient = new PollyClient({
    region: REGION,
    requestHandler: new NodeHttpHandler({
        httpAgent: agent,
        httpsAgent: agent,
    }),
});

export  { pollyClient };
// snippet-end:[polly.JavaScript.createclientv3]
