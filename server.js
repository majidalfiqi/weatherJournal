// App API endpoint
const projectData = [];
// port
const PORT = 5555;

// including modules
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// instantiating the app
const app = express();

// connecting the server to the front-end
app.use(express.static("website"));

// using the modules
app.use(cors());
app.use(bodyParser.json());

// starting the server
app.listen(PORT, () => console.log("Server is running on localhost:" + PORT));

// GET route at /data
app.get("/data", (req, res) => {
  console.log('GET request received at "/data".');
  res.send(projectData);
  console.log("Responded with:\n" + projectData);
});

// POST request at /add
app.post("/add", (req, res) => {
  console.log('POST request received at "/add".');
  projectData.push(req.body);
});
