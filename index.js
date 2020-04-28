const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
require('./keys')


//configuring the AWS environment
AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  });

var s3 = new AWS.S3();
var filePath = "./data/Siggy.png";

//configuring parameters
var params = {
  Bucket: S3_BUCKET,
  Body : fs.createReadStream(filePath),
  Key : "folder/"+Date.now()+"_"+path.basename(filePath)
};

s3.upload(params, function (err, data) {
  //handle error
  if (err) {
    console.log("Error", err);
  }

  //success
  if (data) {
    console.log("Uploaded in:", data.Location);
  }
});
