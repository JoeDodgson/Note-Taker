// Store jQuery selectors as variables
const $noteTitle = $(".note-title");
const $noteText = $(".note-textarea");
const $saveNoteBtn = $(".save-note");
const $newNoteBtn = $(".new-note");
const $noteList = $(".list-container .list-group");
const $confirmationMessage = $("#confirmation-message");
const $savedNoteTitle = $("#saved-note-title");
const $savedNoteText = $("#saved-note-text");

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

// A function for getting all notes from the db
const getNotes = () => {
  return $.ajax({
    url: "/api/notes",
    method: "GET"
  });
};

// A function for saving a note to the db
const saveNote = note => {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST"
  });
};

// A function for deleting a note from the db
const deleteNote = id => {
  return $.ajax({
    url: "api/notes/" + id,
    method: "DELETE"
  });
};

// If there is an activeNote, display it, otherwise render empty inputs
const renderActiveNote = () => {
  $saveNoteBtn.hide();

  if (activeNote.id) {
    $noteTitle.attr("readonly", true);
    $noteText.attr("readonly", true);
    $noteTitle.val(activeNote.title);
    $noteText.val(activeNote.text);
  } else {
    $noteTitle.attr("readonly", false);
    $noteText.attr("readonly", false);
    $noteTitle.val("");
    $noteText.val("");
  }
};

// Get the note data from the inputs, save it to the db and update the view
const handleNoteSave = () => {
  const newNote = {
    title: $noteTitle.val(),
    text: $noteText.val()
  };
  saveNote(newNote).then(data => {
    getAndRenderNotes();
    renderActiveNote();
    saveSuccess(data);
  });
};

// Delete the clicked note
const handleNoteDelete = function(event) {
  // prevents the click listener for the list from being called when the button inside of it is clicked
  event.stopPropagation();

  const note = $(this)
    .parent(".list-group-item")
    .data();

  if (activeNote.id === note.id) {
    activeNote = {};
  }

  deleteNote(note.id).then(() => {
    getAndRenderNotes();
    renderActiveNote();
    deleteSuccess();
  });
};

// Sets the activeNote and displays it
const handleNoteView = function() {

  // Clear out any previous confirmation message
  $confirmationMessage.empty();

  activeNote = $(this).data();
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewNoteView = () => {

  // Clear out any previous confirmation message
  $confirmationMessage.empty();

  activeNote = {};
  renderActiveNote();
};

// If a note's title or text are empty, hide the save button
// Or else show it
const handleRenderSaveBtn = () => {
  if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
    $saveNoteBtn.hide();
  } else {
    $saveNoteBtn.show();
  }
};

// Render's the list of note titles
const renderNoteList = notes => {
  // Clear out the note list container
  $noteList.empty();
  const noteListItems = [];

  // Loop through all notes and create HTML element containing that note
  for (let i = 0; i < notes.length; i++) {
    let note = notes[i];

    let $li = $("<li class='list-group-item'>").data(note);
    let $span = $("<span>").text(note.title);
    let $delBtn = $(
      "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
    );
 
    $li.append($span, $delBtn);

    // Push note HTML element into noteListItems array
    noteListItems.push($li);
  }

  // Append all note HTML elements onto note list container
  $noteList.append(noteListItems);
};

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = () => {
  return getNotes().then(data => {
    renderNoteList(data);
  });
};

// Displays note save success message, including title and text of note
const saveSuccess = data => {
  
  // Clear out any previous confirmation message
  $confirmationMessage.empty();
  
  const saveMessageContent = $(
    `<p>Success! Your note was saved:</p>
    <p id="success-note-title">Title: ${data.title}</p>
    <p id="success-note-text">Text: ${data.text}</p>`);
    
    $confirmationMessage.append(saveMessageContent);
  }
  
// Displays note delete success message
const deleteSuccess = () => {
  
  // Clear out any previous confirmation message
  $confirmationMessage.empty();

  const deleteMessageContent = $(
    `<p>Success! Your note was deleted</p>`);

  $confirmationMessage.append(deleteMessageContent);
}

// Click event listeners
$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);

// Gets and renders the initial list of notes
getAndRenderNotes();
