// Require in dependencies
const express = require("express");
const fs = require("fs");

// Set up new express server
const app = express();
const PORT = 3000;

// Set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up server listener
app.listen(PORT, function() {
    console.log("Server listening on PORT " + PORT);
});
  