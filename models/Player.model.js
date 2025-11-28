const { Schema, model } = require("mongoose");

const playerSchema = new Schema({
    
    name: {
      type: String,
      required: true,
      trim: true
    },

    social: String, 
    image: String,    

    teamTrophies: [String],   
    individualAwards: [String], 

    nation: [String], 

    description: String,

    goals: {
      type: Number,
      default: 0
    },

    assists: {
      type: Number,
      default: 0
    },

    birthday: Date,

    
    position: {
      type: Schema.Types.ObjectId,
      ref: "Position",
      required: true
    }
    
});

const Player = model("Player", playerSchema);

module.exports = Player