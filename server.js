// Require in dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const util = require("util");

// Promisify the readFile function
const readFileAsync = util.promisify(fs.readFile);

// Set up new express server
const app = express();
const PORT = 3000;

// Define paths
const notesHTMLPath = path.join(__dirname, "public/notes.html");
const indexHTMLPath = path.join(__dirname, "public/index.html");
const dbJSONPath = path.join(__dirname, "db/db.json");
const publicPath = path.join(__dirname, "public");

// Set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up the express app to serve the user the content of the public folder
app.use(express.static(publicPath));

// Routes
// notes
app.get("/notes", function(req, res) {
    res.sendFile(notesHTMLPath);
});

// index
app.get("*", function(req, res) {
    res.sendFile(indexHTMLPath);
});


// Get request for notes data
app.get("/api/notes", async function(req, res) {
    try {
    const dbJSONContent = await readFileAsync(dbJSONPath);
    return res.json(dbJSONContent);

    } catch (error) {
        console.log(error);
    }
});

// Set up server listener
app.listen(PORT, function() {
    console.log("Server listening on PORT " + PORT);
});