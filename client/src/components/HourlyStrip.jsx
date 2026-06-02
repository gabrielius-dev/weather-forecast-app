import { Column, Grid, Tile } from "@carbon/react";
import { wmoToLabel } from "../utils/wmoToIcon";
import WeatherIcon from "./WeatherIcon";
import { formatDateKey, formatHour } from "../utils/datetime";

export default function HourlyStrip({ hourlyByDay }) {
  const todayDate = new Date();
  const todayDateKey = formatDateKey(todayDate);
  const tomorrowDateKey = formatDateKey(
    new Date(
      todayDate.getFullYear(),
      todayDate.getMonth(),
      todayDate.getDate() + 1,
    ),
  );

  const now = new Date();
  const allHours = [
    ...(hourlyByDay[todayDateKey] ?? []),
    ...(hourlyByDay[tomorrowDateKey] ?? []),
  ];
  const strip = allHours
    .filter((info) => new Date(info.time) >= now)
    .slice(0, 24);

  return (
    <Grid>
      <Column sm={4} md={8} lg={16}>
        <Tile className="hourly-strip">
          {strip.map((info) => (
            <div className="hourly-cell" key={info.time}>
              <span className="hourly-time">{formatHour(info.time)}</span>
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
        </Tile>
      </Column>
    </Grid>
  );
}
