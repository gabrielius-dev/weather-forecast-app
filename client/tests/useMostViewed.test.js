import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useMostViewed from "../src/hooks/useMostViewed.js";

const STORAGE_KEY = "wf:cityViews";

const makeEntry = (id, name, count, lastViewed) => ({
  id,
  name,
  country: "XX",
  lat: 0,
  lon: 0,
  count,
  lastViewed,
});

describe("useMostViewed", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("recordView sets count to 1 on first call", () => {
    const { result } = renderHook(() => useMostViewed());
    const city = {
      id: 1,
      name: "Vilnius",
      country: "LT",
      lat: 54.68,
      lon: 25.27,
    };

    act(() => {
      result.current.recordView(city);
    });

    expect(result.current.topCities[0].count).toBe(1);
  });

  it("recordView increments count on each subsequent call", () => {
    const { result } = renderHook(() => useMostViewed());
    const city = {
      id: 1,
      name: "Vilnius",
      country: "LT",
      lat: 54.68,
      lon: 25.27,
    };

    act(() => result.current.recordView(city));
    act(() => result.current.recordView(city));

    expect(result.current.topCities[0].count).toBe(2);
  });

  it("returns at most 3 cities sorted by count descending", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        1: makeEntry(1, "Alpha", 10, 100),
        2: makeEntry(2, "Beta", 3, 100),
        3: makeEntry(3, "Gamma", 7, 100),
        4: makeEntry(4, "Delta", 5, 100),
      }),
    );

    const { result } = renderHook(() => useMostViewed());

    expect(result.current.topCities).toHaveLength(3);
    expect(result.current.topCities[0].name).toBe("Alpha");
    expect(result.current.topCities[1].name).toBe("Gamma");
    expect(result.current.topCities[2].name).toBe("Delta");
  });

  it("breaks count ties by lastViewed descending", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        1: makeEntry(1, "Older", 5, 1000),
        2: makeEntry(2, "Newer", 5, 9000),
      }),
    );

    const { result } = renderHook(() => useMostViewed());

    expect(result.current.topCities[0].name).toBe("Newer");
    expect(result.current.topCities[1].name).toBe("Older");
  });
});
