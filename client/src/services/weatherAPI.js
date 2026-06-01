const BASE_URL = "https://api.open-meteo.com/v1/forecast";

export async function fetchWeather({ lat, lon }) {
  const url = new URL(BASE_URL);
  url.searchParams.set("latitude", lat);
  url.searchParams.set("longitude", lon);
  url.searchParams.set(
    "current",
    [
      "temperature_2m",
      "apparent_temperature",
      "relative_humidity_2m",
      "wind_speed_10m",
      "surface_pressure",
      "weather_code",
      "is_day",
    ].join(","),
  );
  url.searchParams.set(
    "daily",
    [
      "temperature_2m_max",
      "temperature_2m_min",
      "weather_code",
      "precipitation_probability_max",
      "wind_speed_10m_max",
    ].join(","),
  );
  url.searchParams.set(
    "hourly",
    ["temperature_2m", "weather_code", "precipitation_probability"].join(","),
  );
  url.searchParams.set("timezone", "auto");
  url.searchParams.set("forecast_days", "6");

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status}`);
  }

  const data = await response.json();
  return transform(data);
}

function transform({ current, daily, hourly }) {
  return {
    current: {
      temperature: current.temperature_2m,
      apparentTemperature: current.apparent_temperature,
      humidity: current.relative_humidity_2m,
      windSpeed: current.wind_speed_10m,
      pressure: current.surface_pressure,
      weatherCode: current.weather_code,
      isDay: current.is_day === 1,
    },
    daily: daily.time.map((date, i) => ({
      date,
      tempMax: daily.temperature_2m_max[i],
      tempMin: daily.temperature_2m_min[i],
      weatherCode: daily.weather_code[i],
      precipProbabilityMax: daily.precipitation_probability_max[i],
      windSpeedMax: daily.wind_speed_10m_max[i],
    })),
    hourlyByDay: hourly.time.reduce((acc, isoTime, i) => {
      const date = isoTime.slice(0, 10);
      if (!acc[date]) acc[date] = [];
      acc[date].push({
        time: isoTime,
        temperature: hourly.temperature_2m[i],
        weatherCode: hourly.weather_code[i],
        precipitationProbability: hourly.precipitation_probability[i],
      });
      return acc;
    }, {}),
  };
}
