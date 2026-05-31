const BASE_URL = "https://geocoding-api.open-meteo.com/v1/search";

export async function searchCities(query) {
  const url = new URL(BASE_URL);
  url.searchParams.set("name", query);
  url.searchParams.set("count", 10);
  url.searchParams.set("language", "en");
  url.searchParams.set("format", "json");

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Geocoding API error: ${response.status}`);
  }

  const data = await response.json();

  return (data.results ?? []).map((r) => ({
    id: r.id,
    name: r.name,
    admin1: r.admin1 ?? null,
    country: r.country_code,
    lat: r.latitude,
    lon: r.longitude,
  }));
}
