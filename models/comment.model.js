const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    text: { type: String, required: true },

    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    
    player: {
      type: Schema.Types.ObjectId,
      ref: "Player",
      required: true
    }
  },
);

module.exports = model("Comment", commentSchema);
