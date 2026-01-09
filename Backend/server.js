import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import feedbackRoutes from "./routes/feedbackRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://tomato:tomato123@cluster0.rvhoxji.mongodb.net/AdFeedback")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/api/feedback", feedbackRoutes);

app.listen(4000, () => console.log("Server running on 4000"));
