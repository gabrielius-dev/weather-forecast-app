import { useState } from "react";
import { readCityViews, writeCityViews } from "../utils/storage";

function getTopCities(cityViews) {
  return Object.values(cityViews)
    .sort((a, b) => b.count - a.count || b.lastViewed - a.lastViewed)
    .slice(0, 3);
}

export default function useMostViewed() {
  const [topCities, setTopCities] = useState(() =>
    getTopCities(readCityViews()),
  );

  function recordView(city) {
    const stored = readCityViews();
    const key = String(city.id);

    stored[key] = {
      id: city.id,
      name: city.name,
      admin1: city.admin1,
      country: city.country,
      lat: city.lat,
      lon: city.lon,
      count: (stored[key]?.count ?? 0) + 1,
      lastViewed: Date.now(),
    };

    writeCityViews(stored);
    setTopCities(getTopCities(stored));
  }

  return { topCities, recordView };
}
