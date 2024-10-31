const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// Get all quilts related to that user
router.get("/", (req, res) => {
  const userId = req.user.id;
  const queryText = 'SELECT * FROM quilt WHERE "user_id" = $1;';
  const params = [userId];
  pool
    .query(queryText, params)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log("Error making GET for quilts:", error);
      res.sendStatus(500);
    });
});

// Get the chosen quilt
router.get("/chosen/:quiltName", (req, res) => {
  const userId = req.user.id;
  const quiltName = req.params.quiltName;
  const formattedQuiltName = quiltName.replaceAll("$", "/");

  const queryText = 'SELECT * FROM quilt WHERE "user_id" = $1 AND "quiltName" = $2;';
  const params = [userId, formattedQuiltName];
  pool
    .query(queryText, params)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log("Error making GET for chosen quilt:", error);
      res.sendStatus(500);
    });
});

// Check if a quiltName already exists
router.get("/check-quilt-exists", async (req, res) => {
  // Set the Access-Control-Allow-Origin header to allow requests from the specified origin
  res.set("Access-Control-Allow-Origin", "http://localhost:5173");
  const quiltName = req.query.quiltName;
  const formattedQuiltName = quiltName.replaceAll("$", "/");
  const queryText = `SELECT * FROM quilt WHERE "quiltName" = $1;`;
  const params = [formattedQuiltName];

  try {
    const results = await pool.query(queryText, params);
    const exists = results.rowCount > 0; // Check if any images were found
    return res.json({ exists });
  } catch (error) {
    console.log("Error checking image existence:", error);
    res.sendStatus(500);
  }
});

// Insert a new quilt and relate it to the project
router.post("/", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:5173");

  const quiltName = req.body.quiltName;
  const userId = req.user.id;

  try {
    const insertQuery = `INSERT INTO quilt ("quiltName", "user_id") VALUES ($1, $2);`;
    const insertParams = [quiltName, userId];
    await pool.query(insertQuery, insertParams);

    res.sendStatus(201); // Created
  } catch (error) {
    console.log("Error making POST for quilt:", error);
    res.sendStatus(500); // Internal server error
  }
});

// Delete an image by its name
router.delete("/:quiltName", (req, res) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:5173");

  const queryText = `DELETE FROM quilt WHERE "quiltName" = $1;`;
  const quiltName = req.params.quiltName;
  const formattedQuiltName = quiltName.replaceAll("$", "/");
  const params = [formattedQuiltName];

  pool
    .query(queryText, params)
    .then((results) => {
      if (results.rowCount > 0) {
        res.sendStatus(204); // No Content
      } else {
        res.sendStatus(404); // Not Found
      }
    })
    .catch((error) => {
      console.log("Error making DELETE for image:", error);
      res.sendStatus(500); // Internal server error
    });
});

// Update the quiltComment
router.put("/", (req, res) => {
  const quiltName = req.body.quiltName;
  const quiltComment = req.body.quiltComment;
  const userId = req.user.id;

  const params = [quiltComment, userId, quiltName]

  const queryText = `
    UPDATE "quilt"
    SET 
    "quiltComment" = $1
    WHERE "user_id" = $2 AND "quiltName" = $3;`;

  pool
    .query(queryText, params)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = router;
