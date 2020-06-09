// Require in dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");

// Set up new express server
const app = express();
const PORT = 3000;

// Define paths for notes.html and index.html
const notesHTMLPath = path.join(__dirname, "public/notes.html");
const indexHTMLPath = path.join(__dirname, "public/index.html");

// Set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get("/notes", function(req, res) {
    res.sendFile(notesHTMLPath);
});

// Routes
app.get("*", function(req, res) {
    res.sendFile(indexHTMLPath);
});

// Set up server listener
app.listen(PORT, function() {
    console.log("Server listening on PORT " + PORT);
});