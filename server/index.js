// Import required modules
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";
import path from "path"; // Import the path module for file paths
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
// Create PostgreSQL database client
const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Connect to the database
db.connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Error connecting to the database:", err));

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// API endpoint for receiving sensor data (POST request)
app.post("/sensor-data", async (req, res) => {
  try {
    // Extract sensor data from the request body
    const { sensorValue1, sensorValue2, Spoint } = req.body;
    console.log(`SensorValue1: ${sensorValue1}`);
    console.log(`SensorValue2: ${sensorValue2}`);
    console.log(`Spoint: ${Spoint}`);
    // Input validation
    if (
      typeof sensorValue1 !== "number" ||
      typeof sensorValue2 !== "number" ||
      typeof Spoint !== "number"
    ) {
      throw new Error("Invalid sensor data format");
    }

    // Insert sensor data into the database
    await db.query(
      "INSERT INTO sensor_data (sensor_value_1, sensor_value_2, spoint) VALUES ($1, $2, $3)",
      [sensorValue1, sensorValue2, Spoint]
    );

    // Send success response
    res.status(200).send("Data inserted successfully");
  } catch (err) {
    // Handle errors
    console.error("Error inserting data:", err);
    res.status(500).send("Error inserting data");
  }
});

// Route for serving the HTML page with sensor data
app.get("/", async (req, res) => {
  try {
    // Fetch sensor data from the database
    const sensorData = await db.query(
      "SELECT * FROM sensor_data ORDER BY id DESC LIMIT 11"
    );
    // Render the EJS template with sensor data
    res.render("page.ejs", { sensorData: sensorData.rows });
  } catch (err) {
    console.error("Error fetching sensor data:", err); // Log the error
    res.status(500).send("Error fetching sensor data");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
