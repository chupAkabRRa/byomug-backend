const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, unique: true, required: true },
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
  registeredDate: { type: Date, default: Date.now },
  hash: { type: String, required: true }
});

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("User", schema);
