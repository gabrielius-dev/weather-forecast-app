const WMO = {
  0: { day: "clear-day", night: "clear-night", label: "Clear sky" },
  1: {
    day: "mostly-clear-day",
    night: "mostly-clear-night",
    label: "Mainly clear",
  },
  2: {
    day: "partly-cloudy-day",
    night: "partly-cloudy-night",
    label: "Partly cloudy",
  },
  3: { day: "overcast-day", night: "overcast-night", label: "Overcast" },
  45: { day: "fog-day", night: "fog-night", label: "Fog" },
  48: { day: "fog-day", night: "fog-night", label: "Depositing rime fog" },
  51: {
    day: "partly-cloudy-day-drizzle",
    night: "partly-cloudy-night-drizzle",
    label: "Light drizzle",
  },
  53: { day: "overcast-drizzle", night: "overcast-drizzle", label: "Drizzle" },
  55: {
    day: "extreme-drizzle",
    night: "extreme-drizzle",
    label: "Dense drizzle",
  },
  56: {
    day: "overcast-sleet",
    night: "overcast-sleet",
    label: "Freezing drizzle",
  },
  57: {
    day: "overcast-sleet",
    night: "overcast-sleet",
    label: "Dense freezing drizzle",
  },
  61: {
    day: "partly-cloudy-day-rain",
    night: "partly-cloudy-night-rain",
    label: "Slight rain",
  },
  63: { day: "overcast-rain", night: "overcast-rain", label: "Rain" },
  65: { day: "extreme-rain", night: "extreme-rain", label: "Heavy rain" },
  66: {
    day: "overcast-sleet",
    night: "overcast-sleet",
    label: "Freezing rain",
  },
  67: {
    day: "extreme-sleet",
    night: "extreme-sleet",
    label: "Heavy freezing rain",
  },
  71: {
    day: "partly-cloudy-day-snow",
    night: "partly-cloudy-night-snow",
    label: "Slight snow",
  },
  73: { day: "overcast-snow", night: "overcast-snow", label: "Snow" },
  75: { day: "extreme-snow", night: "extreme-snow", label: "Heavy snow" },
  77: { day: "overcast-snow", night: "overcast-snow", label: "Snow grains" },
  80: {
    day: "partly-cloudy-day-rain",
    night: "partly-cloudy-night-rain",
    label: "Slight rain showers",
  },
  81: { day: "overcast-rain", night: "overcast-rain", label: "Rain showers" },
  82: {
    day: "extreme-rain",
    night: "extreme-rain",
    label: "Violent rain showers",
  },
  85: {
    day: "partly-cloudy-day-snow",
    night: "partly-cloudy-night-snow",
    label: "Slight snow showers",
  },
  86: {
    day: "overcast-snow",
    night: "overcast-snow",
    label: "Heavy snow showers",
  },
  95: {
    day: "thunderstorms-day",
    night: "thunderstorms-night",
    label: "Thunderstorm",
  },
  96: {
    day: "thunderstorms-day-hail",
    night: "thunderstorms-night-hail",
    label: "Thunderstorm with hail",
  },
  99: {
    day: "thunderstorms-extreme-hail",
    night: "thunderstorms-extreme-hail",
    label: "Thunderstorm with heavy hail",
  },
};

const FALLBACK = {
  day: "not-available",
  night: "not-available",
  label: "Unknown",
};

export function wmoToIcon(code, isDay = true) {
  const entry = WMO[code] ?? FALLBACK;
  return isDay ? entry.day : entry.night;
}

export function wmoToLabel(code) {
  return (WMO[code] ?? FALLBACK).label;
}
