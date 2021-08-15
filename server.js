// app API endpoint
const projectData = {};
// data history
const data = [];
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
app.get("/all", (req, res) => {
  console.log('GET request received at "/all".');
  res.send(data);
  console.log("Response sent with the following:");
  console.log(data);
});

// GET route at /data
app.get("/data", (req, res) => {
  console.log('GET request received at "/data".');
  res.send(projectData);
  console.log("Response sent with following:");
  console.log(projectData);
});

// POST request at /add
app.post("/add", (req, res) => {
  console.log('POST request received at "/add".');
  for (key in req.body) {
    projectData[key] = req.body[key];
  }
  data.push(req.body);
  console.log("The following data was added to endpoint:");
  console.log(projectData);
  res.send({
    data: req.body,
    msg: "Data Received successfully.",
  });
});
