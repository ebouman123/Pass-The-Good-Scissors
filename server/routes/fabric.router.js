const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// Get all fabrics related to that user
router.get("/", (req, res) => {
  const userId = req.user.id;
  const queryText = 'SELECT * FROM fabric WHERE "user_id" = $1;';
  const params = [userId];
  pool
    .query(queryText, params)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log("Error making GET for fabrics:", error);
      res.sendStatus(500);
    });
});

// Check if a fabricName already exists
router.get("/check-fabric-exists", async (req, res) => {
  // Set the Access-Control-Allow-Origin header to allow requests from the specified origin
  res.set("Access-Control-Allow-Origin", "http://localhost:5173");
  const fabricName = req.query.fabricName;
  const formattedFabricName = fabricName.replaceAll("$", "/");
  const queryText = `SELECT * FROM fabric WHERE "fabricName" = $1;`;
  const params = [formattedFabricName];

  try {
    const results = await pool.query(queryText, params);
    const exists = results.rowCount > 0; // Check if any images were found
    return res.json({ exists });
  } catch (error) {
    console.log("Error checking image existence:", error);
    res.sendStatus(500);
  }
});

// Insert a new fabric and relate it to the project
router.post("/", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:5173");

  const fabricName = req.body.fabricName;
  const userId = req.user.id;

  try {
    const insertQuery = `INSERT INTO fabric ("fabricName", "user_id") VALUES ($1, $2);`;
    const insertParams = [fabricName, userId];
    await pool.query(insertQuery, insertParams);

    res.sendStatus(201); // Created
  } catch (error) {
    console.log("Error making POST for fabric:", error);
    res.sendStatus(500); // Internal server error
  }
});

// Delete an image by its name
router.delete("/:fabricName", (req, res) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:5173");

  const queryText = `DELETE FROM fabric WHERE "fabricName" = $1;`;
  const fabricName = req.params.fabricName;
  const formattedFabricName = fabricName.replaceAll("$", "/");
  const params = [formattedFabricName];

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

module.exports = router;
