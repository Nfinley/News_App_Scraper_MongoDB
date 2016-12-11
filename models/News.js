//The NEWS Model. This shows the structure of each news article

'use strict';

// Require mongoose
const mongoose = require("mongoose"),
// Create Schema class
     Schema = mongoose.Schema;

// Create article schema
const NewsSchema = new Schema({
    // title is a required string
    title: {
        type: String,
        required: true
    },
    // link is a required string
    link: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    brief: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    // This only saves one note's ObjectId, ref refers to the Note model
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

// Create the Article model with the ArticleSchema
const News = mongoose.model("News", NewsSchema);

// Export the model
module.exports = News;