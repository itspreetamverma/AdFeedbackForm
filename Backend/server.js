import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import dotenv from "dotenv"


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/api/feedback", feedbackRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("Server running on PORT", PORT));

