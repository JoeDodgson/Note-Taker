// Require in dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const util = require("util");
const notes = require("./notes");
const Note = notes.Note;

// Promisify the readFile and writeFile functions
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

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
        debugger
        // Read and return the content from db.JSON file
        const dbJSONContent = await readFileAsync(dbJSONPath);
        
        // Send a 200 status
        return res.status(200).json(JSON.parse(dbJSONContent));

    } catch (error) {
        console.log(error);
        // Return something to the front end
    }
});

// Handler for post request for new note
app.post("/api/notes", async function(req, res) {
    try {
        // Read in the dbJSON content, parse and store as a variable
        const dbJSONContent = await readFileAsync(dbJSONPath);
        const dbJSONArray = JSON.parse(dbJSONContent);
        
        // Create an object for the new note
        const lastNote = dbJSONArray[dbJSONArray.length - 1];
        const lastNoteId = parseInt(lastNote.id);
        const newId = lastNoteId + 1;
        const newNote = new Note(newId, req.body.title, req.body.text);

        // Push new note object into the dbJSON variable
        dbJSONArray.push(newNote.returnString());

        // Update the dbJSON file with the updated dbJSONArray
        const dbJSONFile = await writeFileAsync(dbJSONPath, JSON.stringify(dbJSONArray));

        // Send a 200 status
        return res.status(200).send(newNote.returnString());

    } catch (error) {
        console.log(error);
        // Return something to the front end
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