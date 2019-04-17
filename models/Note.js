var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var NotesSchema = new Schema({
    title: {
        type: String,
        body: String
    }
});

var Notes = mongoose.model("Note", NotesSchema);

module.exports = Notes;
