const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({

    username: String,

    text: String,

    likes: {
        type: Number,
        default: 0
    },

    comments: {
        type: [String],
        default: []
    }

});

module.exports = mongoose.model("Post", postSchema);