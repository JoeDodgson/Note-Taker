// Require in dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const util = require("util");
const notes = require("./notes");

// Promisify the readFile function
const readFileAsync = util.promisify(fs.readFile);

// Set up new express server
const app = express();
const PORT = 3000;

// Define paths
const notesHTMLPath = path.join(__dirname, "public/notes.html");
const indexHTMLPath = path.join(__dirname, "public/index.html");
const publicPath = path.join(__dirname, "public");
const dbPath = path.join(__dirname, "db");
const dbJSONPath = path.join(dbPath, "/db.json");

// Set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up the express app to serve the user the content of the public folder
app.use(express.static(publicPath));
// app.use(express.static(dbPath));

// Routes
// notes
app.get("/notes", function(req, res) {
    res.sendFile(notesHTMLPath);
});

// Handler for get request for notes data
app.get("/api/notes", async function(req, res) {
    try {
        // Read and return the content from db.JSON file
        const dbJSONContent = await readFileAsync(dbJSONPath);
        return res.json(JSON.parse(dbJSONContent));

    } catch (error) {
        console.log(error);
    }
});

// Handler for post request for new note
app.post("/api/notes", async function(req, res) {
    try {
        // Read in the dbJSON content, parse and store as a variable
        const dbJSONContent = await readFileAsync(dbJSONPath);
        const dbJSONArray = JSON.parse(dbJSONContent);
        
        // Create an object for the new note


        // Push new note object into the dbJSON variable
        dbJSONArray.push();

        // Update the dbJSON file with the updated dbJSONArray

    } catch (error) {
        console.log(error);
    }
});

// index
app.get("*", function(req, res) {
    res.sendFile(indexHTMLPath);
});

// Set up server listener
app.listen(PORT, function() {
    console.log("Server listening on PORT " + PORT);
});