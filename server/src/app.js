import express from "express";
import cors from "cors";
import eventsRouter from "./routes/events.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));

app.use("/api/events", eventsRouter);

export default app;
