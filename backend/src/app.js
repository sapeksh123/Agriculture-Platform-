const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("GrowEdge Backend is working !");
});

module.exports = app;
