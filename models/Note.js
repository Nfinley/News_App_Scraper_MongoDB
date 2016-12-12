//The Note Model. This show the structure of the note

'use strict';

// Require mongoose
const mongoose = require("mongoose"),

// Create a schema class
    Schema = mongoose.Schema;

// Create the Note schema
const NoteSchema = new Schema({
    // Just a string
    body: {
       type: String, required: "Please write your comment"
    }
});

// Remember, Mongoose will automatically save the ObjectIds of the notes
// These ids are referred to in the Article model

// Create the Note model with the NoteSchema
const Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;
