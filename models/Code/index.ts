import mongoose from "mongoose";

const codeSchema = new mongoose.Schema({
  user: { type: String },
  challengeName: { type: String },
  code: { type: String },
  tests: { type: String }
});

export default mongoose.models.Code || mongoose.model("Code", codeSchema);
