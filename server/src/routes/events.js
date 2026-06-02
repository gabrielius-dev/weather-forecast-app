import express from "express";
import { validateEvent } from "../middleware/validateEvent.js";
import pool from "../db/pool.js";

const router = express.Router();

router.post("/", validateEvent, async (req, res) => {
  const { cityName, admin1, country, latitude, longitude } = req.body;

  const selectedAt = new Date().toISOString();

  console.log(
    `[city-selection] ${selectedAt} | ${[cityName, admin1, country].filter(Boolean).join(", ")} | lat=${latitude}, lon=${longitude}`,
  );

  try {
    await pool.query(
      `INSERT INTO city_selection_events
         (city_name, admin1, country, latitude, longitude, selected_at, user_agent, client_ip)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        cityName,
        admin1 ?? null,
        country ?? null,
        latitude,
        longitude,
        selectedAt,
        req.get("User-Agent") ?? null,
        req.ip ?? null,
      ],
    );
    res.status(201).json({ ok: true });
  } catch (dbError) {
    console.error("[events] DB insert failed:", dbError.message);
    res.status(202).json({ ok: true });
  }
});

export default router;
