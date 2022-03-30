const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const exerciseSchema = new Schema(
  {
    username: { type: String, required: true },
    uid: { type: String, required: true },
    description: { type: String, required: true },
    duration: {
      type: Number,
      required: true,
    },
    date: { type: String },
  },
  { versionKey: false }
);
const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
