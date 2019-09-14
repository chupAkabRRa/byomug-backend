const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  username: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  referals: [
    {
      host: { type: Schema.Types.ObjectId, ref: "Host" },
      score: { type: Number }
    }
  ],
  registeredDate: { type: Date, default: Date.now },
  hash: { type: String, required: true }
});

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("User", schema);
