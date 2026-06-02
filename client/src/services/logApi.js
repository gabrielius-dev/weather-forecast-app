export function logCitySelection(city) {
  return fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cityName: city.name,
      admin1: city.admin1,
      country: city.country,
      latitude: city.lat,
      longitude: city.lon,
    }),
  });
}
