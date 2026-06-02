import { Router } from "express";
import { validateEvent } from "../middleware/validateEvent.js";

const router = Router();

router.post("/", validateEvent, (req, res) => {
  const { cityName, admin1, country, latitude, longitude } = req.body;
  const selectedAt = new Date().toISOString();

  console.log(
    `[city-selection] ${selectedAt} | ${[cityName, admin1, country].filter(Boolean).join(", ")} | lat=${latitude}, lon=${longitude}`,
  );

  res.status(201).json({ status: "logged", selectedAt });
});

export default router;
