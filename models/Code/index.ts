import mongoose from "mongoose";

const codeSchema = new mongoose.Schema({
  user: { type: String },
  challengeName: { type: String },
  code: { type: String },
  tests: { type: String }
});

// global.noteSchema = global.noteSchema ||
const code = mongoose.model("Code", codeSchema);

export default code;
