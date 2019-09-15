const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  username: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  isHost: { type: Boolean, required: true, default: false },
  location: {
    type: {
      type: String,
      enum: ["Point"]
    },
    coordinates: {
      type: [Number]
    }
  },
  referals: [
    {
      host: this,
      score: { type: Number }
    }
  ],
  hash: { type: String, required: true }
});

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("User", schema);
