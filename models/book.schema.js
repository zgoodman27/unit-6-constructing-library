// bringing in mongoose models and schemas
const { Schema, model } = require("mongoose");
const { required } = require("nodemon/lib/config");

// defining the Book schema
const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  copies: {
    type: Number,
    required: true,
  },
});

// exporting the message model
module.exports = model("Book", bookSchema);
