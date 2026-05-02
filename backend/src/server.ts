import express from "express";
import dotenv from "dotenv";
import { connectTODb } from "./config/db";
dotenv.config();
import cors from "cors";
import { userRouter } from "./routers/userRouter";
import cookieParser from "cookie-parser";
import { jobRouter } from "./routers/jobRoutes";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("Hello from the app");
});

app.use("/api/users", userRouter);
app.use("/api/jobs", jobRouter);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectTODb();
    app.listen(PORT, () => {
      console.log(`Server is running on Port ${PORT}`);
    });
  } catch (error) {
    console.log("Server failed to start ", error);
  }
};

startServer();
