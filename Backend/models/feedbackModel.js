import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  name: String,
  company: String,
  description: String,
  feedback: String,
  rating: Number,
}, { timestamps: true });

export default mongoose.model("Feedback", feedbackSchema);
