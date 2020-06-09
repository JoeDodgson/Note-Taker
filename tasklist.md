Create files
Pseudocode JS
Write JS
Deploy to heroku
Write readme


Pseudocode:
Install modules:
    Nodemon
    Express
    FS

Require in modules
Set up the express server
Decide structure of db.json file. Each note must have an id
Set up routes:
    /notes -> notes.html
    * -> index.html
Set up request handlers:
    GET /api/notes - Should read the `db.json` file and return all saved notes as JSON.
    POST /api/notes - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
    DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.