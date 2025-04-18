import cors from "cors";
import dotenv from "dotenv";
import express from "express";
dotenv.config();

// Import routes
import authRoutes from "@routes/auth.routes";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Test server
app.get("/", (_, res) => {
	res.send("Server is running");
});

// Routes
app.use("/auth", authRoutes);

export default app;
