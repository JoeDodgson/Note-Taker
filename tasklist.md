<!-- Create files -->
<!-- Pseudocode JS -->
<!-- Write JS -->
<!-- Refactor to ES6 -->
<!-- Add comments -->
<!-- Deploy to heroku -->
Write readme


Optional:
Check if db.JSON file exists. If not, create one
Remove duplication in creating note object
HTML changes:
notes.html
    centralise note title and note text textarea fields
    centralise Note Taker title
    Make save and edit icons larger and move to beside note title and text
    Move note list below new note input

<!-- JS Pseudocode: -->
<!-- Install modules:
    Nodemon
    Express
    FS -->
<!-- Require in modules -->
<!-- Set up the express server
    app = express
    port
    express data parsing
    server listener -->
<!-- Decide structure of db.json file. Each note must have an id -->
<!-- Set up routes:
    /notes -> notes.html
    * -> index.html -->
<!-- Set up request handlers:
    GET /api/notes - Should read the `db.json` file and return all saved notes as JSON.
    POST /api/notes - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
    DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file. -->
<!-- Display a message to user to state that the note has been saved
    Amend the size of note text so that it resizes to fit content
    Add a placeholder div displaying success message
    Amend save function to:
        Empty the success message container
        Populate success message container with new note title, text and new note success message
    Amend other functions to empty the success message container -->
<!-- Display a message to user that note has been deleted
    Amend delete function to:
        Empty the success message container
        Populate success message container with deleted note title, text and delete message
    Amend other functions add display-none class to success message -->
<!-- Fix delete replacing IDs with strings -->
<!-- Send error status in case of error  -->