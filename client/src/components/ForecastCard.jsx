import {
  ExpandableTile,
  TileAboveTheFoldContent,
  TileBelowTheFoldContent,
} from "@carbon/react";
import WeatherIcon from "./WeatherIcon";
import { wmoToLabel } from "../utils/wmoToIcon";

function weekday(dateStr) {
  return new Date(`${dateStr}T12:00`).toLocaleDateString("en-US", {
    weekday: "short",
  });
}

function hour(timeStr) {
  return new Date(timeStr).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
}

export default function ForecastCard({ day, hourly, expanded, onToggle }) {
  const condition = wmoToLabel(day.weatherCode);

  return (
    <ExpandableTile
      className="forecast-card"
      expanded={expanded}
      onClick={onToggle}
      tileCollapsedIconText="Expand to see hourly"
      tileExpandedIconText="Collapse hourly"
    >
      <TileAboveTheFoldContent>
        <div className="forecast-summary">
          <p className="forecast-day">{weekday(day.date)}</p>
          <WeatherIcon
            code={day.weatherCode}
            isDay
            size={44}
            label={condition}
          />
          <p className="forecast-temps">
            <span className="forecast-hi">↑{Math.round(day.tempMax)}°</span>
            <span className="forecast-lo">↓{Math.round(day.tempMin)}°</span>
          </p>
          <p className="forecast-precip">{day.precipProbabilityMax}%</p>
        </div>
      </TileAboveTheFoldContent>

      <TileBelowTheFoldContent>
        <div className="hourly-strip">
          {hourly.map((info) => (
            <div className="hourly-cell" key={info.time}>
              <span className="hourly-time">{hour(info.time)}</span>
              <WeatherIcon
                code={info.weatherCode}
                isDay={info.isDay}
                size={24}
                label={wmoToLabel(info.weatherCode)}
              />
              <span className="hourly-temp">
                {Math.round(info.temperature)}°
              </span>
              <span className="hourly-precip">
                {info.precipitationProbability}%
              </span>
            </div>
          ))}
        </div>
      </TileBelowTheFoldContent>
    </ExpandableTile>
  );
}
