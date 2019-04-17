var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    headline: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    urlLink: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: Date
    },
    note: [{
        type: Schema.Types.ObjectId,
        ref: "note"
    }]
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;