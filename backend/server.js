import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
