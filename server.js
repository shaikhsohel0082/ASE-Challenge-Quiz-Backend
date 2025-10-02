import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import questionroutes from "./routes/questionRoute.js";
import dotenv from "dotenv";
import { seedQuestions } from "./models/seedQuestions.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log(`MongoDB connected.`);
    await seedQuestions();
  })
  .catch((err) => console.log(`error connecting MongoDB:${err}`));

app.use("/question", questionroutes);
app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
