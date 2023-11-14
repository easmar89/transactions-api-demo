const express = require("express");
const path = require("path");
const cors = require("cors");
const api_endpoints = require("../api");
const errorHandler = require("../middleware/errorHandler");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, "../../../app-react/build")));
app.use("/", api_endpoints);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../../app-react/build", "index.html"));
});

app.use(errorHandler);

module.exports = app;
