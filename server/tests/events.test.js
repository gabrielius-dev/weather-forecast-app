import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import app from "../src/app.js";
import pool from "../src/db/pool.js";

vi.mock("../src/db/pool.js", () => ({
  default: { query: vi.fn() },
}));

const validPayload = {
  cityName: "Vilnius",
  country: "LT",
  latitude: 54.6872,
  longitude: 25.2797,
};

describe("POST /api/events", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    pool.query.mockResolvedValue({ rows: [{ id: 1 }] });
  });

  it("returns 201 with valid payload", async () => {
    const res = await request(app).post("/api/events").send(validPayload);

    expect(res.status).toBe(201);
    expect(pool.query).toHaveBeenCalledOnce();
  });

  it("returns 400 when cityName is missing", async () => {
    const { cityName, ...withoutName } = validPayload;

    const res = await request(app).post("/api/events").send(withoutName);

    expect(res.status).toBe(400);
    expect(pool.query).not.toHaveBeenCalled();
  });

  it("returns 400 when latitude is not a number", async () => {
    const res = await request(app)
      .post("/api/events")
      .send({ ...validPayload, latitude: "not-a-number" });

    expect(res.status).toBe(400);
    expect(pool.query).not.toHaveBeenCalled();
  });
});
