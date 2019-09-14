const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, unique: true, required: true },
  location: {
    type: {
      type: String,
      enum: ["Point"]
    },
    coordinates: {
      type: [Number]
    }
  },
  registeredDate: { type: Date, default: Date.now },
  hash: { type: String, required: true }
});

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Host", schema);
