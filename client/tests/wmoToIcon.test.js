import { describe, it, expect } from "vitest";
import { wmoToIcon } from "../src/utils/wmoToIcon.js";

describe("wmoToIcon", () => {
  it("maps WMO 0 to clear-day when isDay is true", () => {
    expect(wmoToIcon(0, true)).toBe("clear-day");
  });

  it("maps WMO 0 to clear-night when isDay is false", () => {
    expect(wmoToIcon(0, false)).toBe("clear-night");
  });

  it("maps WMO 61 (slight rain) to rain", () => {
    expect(wmoToIcon(61, true)).toBe("partly-cloudy-day-rain");
  });

  it("maps WMO 95 to thunderstorms-day when isDay is true", () => {
    expect(wmoToIcon(95, true)).toBe("thunderstorms-day");
  });

  it("maps WMO 95 to thunderstorms-night when isDay is false", () => {
    expect(wmoToIcon(95, false)).toBe("thunderstorms-night");
  });

  it("returns the fallback slug for an unknown WMO code", () => {
    expect(wmoToIcon(999, true)).toBe("not-available");
  });
});
