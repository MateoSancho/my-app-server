const { Schema, model } = require("mongoose");

const positionSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },

    role: { type: String, required: true, trim: true },

    // List of players that play this position
    players: [
      {
        type: Schema.Types.ObjectId,
        ref: "Player"
      }
    ]
  },
);

module.exports = model("Position", positionSchema);