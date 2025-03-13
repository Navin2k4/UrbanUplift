import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import reportRoutes from "./routes/report.route.js";
import authRoutes from "./routes/auth.route.js";
dotenv.config();

mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("MongoDb ON");
    }).catch(err => {
        console.log(err);
    });
    
const __dirname = path.resolve();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true // Important for cookies
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/reports", reportRoutes);
app.use("/api/auth", authRoutes);

app.use(express.static(path.join(__dirname, "client", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!', error: err.message });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`SERVER ${port} ON`);
});
