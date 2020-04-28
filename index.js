
require('./keys')


var AWS = require('aws-sdk'),
request = require('request');


AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  });

var s3 = new AWS.S3();

function UploadFromUrlToS3(url,destPath){
    return new Promise((resolve,reject)=> {
        request({
            url: url,
            encoding: null
        }, function(err, res, body) {
            if (err){
                reject(err);
            }
            var objectParams = {
                ContentType: res.headers['content-type'],
                ContentLength: res.headers['content-length'],
                Key: destPath,
                Bucket: S3_BUCKET,
                Body: body
            };
            resolve(s3.putObject(objectParams).promise());
        });
    });
}

UploadFromUrlToS3('https://a0.awsstatic.com/main/images/logos/aws_logo.png', AWS_SECRET_ACCESS_KEY )
    .then(function() {
        console.log('image was saved...');
    }).catch(function(err) {
        console.log('image was not saved!',err);
    });

    // UploadFromUrlToS3( 'https://www.vectorstock.com/royalty-free-vector/drum-clip-art-cartoon-vector-1504009',
    //     AWS_SECRET_ACCESS_KEY );


//
// const AWS = require('aws-sdk');
// const fs = require('fs');
// const path = require('path');
// require('./keys')
//
//
// //configuring the AWS environment
// AWS.config.update({
//     accessKeyId: AWS_ACCESS_KEY_ID,
//     secretAccessKey: AWS_SECRET_ACCESS_KEY
//   });
//
// var s3 = new AWS.S3();
// var filePath = "./data/Siggy.png";
//
// //configuring parameters
// var params = {
//   Bucket: S3_BUCKET,
//   Body : fs.createReadStream(filePath),
//   Key : "folder/"+Date.now()+"_"+path.basename(filePath)
// };
//
// s3.upload(params, function (err, data) {
//   //handle error
//   if (err) {
//     console.log("Error", err);
//   }
//
//   //success
//   if (data) {
//     console.log("Uploaded in:", data.Location);
//   }
// });
