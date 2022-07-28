const express = require("express");
const app = express().use(express.json());
const { GoogleSpreadsheet } = require("google-spreadsheet");
// const Firestore = require('@google-cloud/firestore');
const creds = require("./myFirstFunction-2346d4df.json");

// const db = new Firestore({
//     projectId: creds.project_id,
//     keyFilename: "./serviecekey-1d9cbd4a66c4.json",
// });

app.get("/", async (request, response) => {
  response.send("Hello!");
});

app.post("/webhook", async (request, response) => {
  const doc = new GoogleSpreadsheet(
    "XXXXXXXXXXXXXXXXXXXXX" // google sheet id from url here
  );

  doc.useServiceAccountAuth({
    client_email: creds.client_email,
    private_key: creds.private_key,
  });
  console.log("req : ", JSON.stringify(request.body));
  let body = request.body
  let { text, sessionInfo, fulfillmentInfo, pageInfo, intentInfo, payload } = body
  const parameters = sessionInfo.parameters ? sessionInfo.parameters : ""

  console.log("parameters are : ", parameters);

  await doc
    .loadInfo()
    .then((d) => console.log("info loaded ",d))
    .catch((e) => console.log("error loading info",e)); // loads document properties and worksheets

  const sheet = doc.sheetsById["123456"]; // or use doc.sheetsByIndex[id]
  let info = {
    user_age: parameters.age,
    user_age: parameters.gender,
  };

  await sheet
    .addRow(info)
    .then((d) => console.log("Row successfully added"))
    .catch((e) => console.log(e));
  response.end("ended");
});
exports.helloWorld = app;
