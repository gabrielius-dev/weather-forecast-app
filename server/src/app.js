import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import eventsRouter from "./routes/events.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.set("trust proxy", 1);
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));

app.use("/api/events", eventsRouter);

const clientDist = path.join(__dirname, "../../client/dist");
app.use(express.static(clientDist));

app.get("*splat", (req, res) => {
  res.sendFile(path.join(clientDist, "index.html"));
});

export default app;
