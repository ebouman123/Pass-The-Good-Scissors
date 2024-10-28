const express = require("express");
const pool = require('../modules/pool')
const router = express.Router();

const AWS = require("aws-sdk");
const cors = require("cors");

// Cross-Origin Resource Sharing (CORS)
router.use(
  cors({
    // Allow requests from the specified origin
    origin: "http://localhost:5173",
  })
);

// Configure the user with environment variables
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-2",
});

const s3 = new AWS.S3();

// Generate presigned URL for a PUT request to upload a file
router.get("/generate-presigned-url", (req, res) => {
  const fileName = req.query.fileName;
  const fileType = req.query.fileType;

  // Params needed for generating a presigned URL
  const s3Params = {
    Bucket: "fabricimagebucket", // The S3 bucket name
    Key: fileName, // The name of the file to be uploaded
    Expires: 600, // The URL expiration time in seconds (10 minutes)
    ContentType: fileType, // The content type of the file
    ACL: "public-read", // Set access control to allow public read access
  };

  // Generate the presigned URL for the putObject operation
  s3.getSignedUrl("putObject", s3Params, (err, url) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    // If successful, send the generated URL back in the response
    res.json({ url });
  });
});


// Generate multiple presigned urls to GET multiple images
router.get("/generate-multiple-presigned-urls", async (req, res) => {
  // Splits the names up into an array
  const fabricNames = req.query.fabricNames.split(",");

  try {
    // Uses Promise.all to handle multiple asynchronous operations simultaneously. For each image name in the array, it attempts to create a presigned URL
    const presignedUrls = await Promise.all(
      fabricNames.map(async (fabricName) => {
        // Params needed for a presigned URL
        const s3Params = {
          Bucket: "fabricimagebucket",
          Key: fabricName,
          Expires: 600,
        };

        // Using a promise-based approach for getSignedUrl
        return new Promise((resolve, reject) => {
          // s3.getSignedUrl(operation, params, callback)
          s3.getSignedUrl("getObject", s3Params, (err, url) => {
            if (err) {
              reject(err);
            } else {
              resolve({ fabricName, url });
            }
          });
        });
      })
    );
    // Responds with a JSON object with the URL(s)
    res.json(presignedUrls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete the specified image from S3
router.delete("/delete-fabric", (req, res) => {
  const fabricName = req.query.fabricName;

  // Params needed for the delete operation
  const s3Params = {
    Bucket: "fabricimagebucket", // The S3 bucket name
    Key: fabricName, // The name of the image to be deleted
  };

  // Call the S3 deleteObject method to delete the image
  s3.deleteObject(s3Params, (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Fabric deleted successfully", data });
  });
});


module.exports = router;
