const express = require("express");
const pool = require("../modules/pool");
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

// // Generate presigned URL for a PUT request to upload a quilt
// router.get("/generate-presigned-url-quilt", (req, res) => {
//   const fileName = req.query.fileName;
//   const fileType = req.query.fileType;

//   // Params needed for generating a presigned URL
//   const s3Params = {
//     Bucket: "fabricimagebucket", // The S3 bucket name
//     Key: fileName, // The name of the file to be uploaded
//     Expires: 600, // The URL expiration time in seconds (10 minutes)
//     ContentType: fileType, // The content type of the file
//     ACL: "public-read", // Set access control to allow public read access
//   };

//   // Generate the presigned URL for the putObject operation
//   s3.getSignedUrl("putObject", s3Params, (err, url) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     // If successful, send the generated URL back in the response
//     res.json({ url });
//   });
// });


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

        // Wait for URLs to be generated
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

// Generate multiple presigned urls to GET multiple quilt images
router.get("/generate-multiple-presigned-urls-quilts", async (req, res) => {
  // Splits the names up into an array
  const quiltNames = req.query.quiltNames.split(",");

  try {
    // Uses Promise.all to handle multiple asynchronous operations simultaneously. For each image name in the array, it attempts to create a presigned URL
    const presignedUrls = await Promise.all(
      quiltNames.map(async (quiltName) => {
        // Params needed for a presigned URL
        const s3Params = {
          Bucket: "fabricimagebucket",
          Key: quiltName,
          Expires: 600,
        };

        // Wait for URLs to be generated
        return new Promise((resolve, reject) => {
          // s3.getSignedUrl(operation, params, callback)
          s3.getSignedUrl("getObject", s3Params, (err, url) => {
            if (err) {
              reject(err);
            } else {
              resolve({ quiltName, url });
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

// Generate a presigned url for the chosen fabric
router.get("/generate-presigned-url-fabric/:fabricName", async (req, res) => {
  const fabricName = req.params.fabricName;
  const formattedFabricName = fabricName.replaceAll("$", "/");

  if (!formattedFabricName) {
    return res.status(400).json({ error: "fabricName is required" });
  }

  try {
    // Params needed for a presigned URL
    const s3Params = {
      Bucket: "fabricimagebucket",
      Key: formattedFabricName,
      Expires: 600,
    };

    // Generate the presigned URL
    const url = await new Promise((resolve, reject) => {
      s3.getSignedUrl("getObject", s3Params, (err, url) => {
        if (err) {
          reject(err);
        } else {
          resolve(url);
        }
      });
    });

    // Respond with the presigned URL
    res.json({ formattedFabricName, url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Generate a presigned url for the chosen quilt
router.get("/generate-presigned-url-quilt/:quiltName", async (req, res) => {
  const quiltName = req.params.quiltName;
  const formattedQuiltName = quiltName.replaceAll("$", "/");

  if (!formattedQuiltName) {
    return res.status(400).json({ error: "quiltName is required" });
  }

  try {
    // Params needed for a presigned URL
    const s3Params = {
      Bucket: "fabricimagebucket",
      Key: formattedQuiltName,
      Expires: 600,
    };

    // Generate the presigned URL
    const url = await new Promise((resolve, reject) => {
      s3.getSignedUrl("getObject", s3Params, (err, url) => {
        if (err) {
          reject(err);
        } else {
          resolve(url);
        }
      });
    });

    // Respond with the presigned URL
    res.json({ formattedQuiltName, url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Delete the specified fabric image from S3
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

// Delete the specified quilt image from S3
router.delete("/delete-quilt", (req, res) => {
  const quiltName = req.query.quiltName;

  // Params needed for the delete operation
  const s3Params = {
    Bucket: "fabricimagebucket", // The S3 bucket name
    Key: quiltName, // The name of the image to be deleted
  };

  // Call the S3 deleteObject method to delete the image
  s3.deleteObject(s3Params, (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Quilt deleted successfully", data });
  });
});

module.exports = router;
