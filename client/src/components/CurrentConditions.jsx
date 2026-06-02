import { Column, Grid, Tag, Tile } from "@carbon/react";
import WeatherIcon from "./WeatherIcon";
import { wmoToLabel } from "../utils/wmoToIcon";

import thermometer from "@meteocons/svg-static/line/thermometer.svg?url";
import wind from "@meteocons/svg-static/line/wind.svg?url";
import humidity from "@meteocons/svg-static/line/humidity.svg?url";
import barometer from "@meteocons/svg-static/line/barometer.svg?url";

const METRIC_ICONS = { thermometer, wind, humidity, barometer };

function Metric({ icon, label, value }) {
  return (
    <div>
      <div className="metric-head">
        <img
          src={METRIC_ICONS[icon]}
          width={26}
          height={26}
          alt=""
          aria-hidden="true"
        />
        <span className="metric-label">{label}</span>
      </div>
      <p className="metric-value">{value}</p>
    </div>
  );
}

export default function CurrentConditions({ city, current }) {
  const condition = wmoToLabel(current.weatherCode);

  return (
    <Grid>
      <Column className="hero-column" sm={4} md={4} lg={8}>
        <Tile className="hero-tile">
          <div>
            <p className="hero-city">{city.name}</p>
            <p className="hero-region">
              {[city.admin1, city.country].filter(Boolean).join(", ")}
            </p>
          </div>
          <div className="hero-main">
            <div className="hero-icon">
              <WeatherIcon
                code={current.weatherCode}
                isDay={current.isDay}
                size={96}
                label={condition}
              />
            </div>
            <div className="hero-readout">
              <p className="hero-temp">{current.temperature}°C</p>
              <Tag type="blue">{condition}</Tag>
            </div>
          </div>
        </Tile>
      </Column>

      <Column sm={4} md={4} lg={8}>
        <Tile className="metric-panel">
          <Metric
            icon="thermometer"
            label="Feels like"
            value={`${current.apparentTemperature}°C`}
          />
          <Metric
            icon="wind"
            label="Wind"
            value={`${current.windSpeed} km/h`}
          />
          <Metric
            icon="humidity"
            label="Humidity"
            value={`${current.humidity}%`}
          />
          <Metric
            icon="barometer"
            label="Pressure"
            value={`${current.pressure} hPa`}
          />
        </Tile>
      </Column>
    </Grid>
  );
}
