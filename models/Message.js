import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    userEmail: String,
    sender: String,
    message: String,
  },
  { timestamps: true }
);

export default mongoose.model(
  "Message",
  messageSchema
);