import { Column, Grid, Tile } from "@carbon/react";

export default function CurrentConditions({ city, current }) {
  return (
    <Grid className="current-conditions">
      <Column sm={4} md={4} lg={8}>
        <Tile className="hero-tile">
          <p className="metric-label">
            {city.name}, {city.country}
          </p>
          <p className="hero-temp">{current.temperature}°C</p>
        </Tile>
      </Column>

      <Column sm={4} md={4} lg={8}>
        <div className="metric-grid">
          <Tile>
            <p className="metric-label">Feels like</p>
            <p className="metric-value">{current.apparentTemperature}°C</p>
          </Tile>
          <Tile>
            <p className="metric-label">Wind</p>
            <p className="metric-value">{current.windSpeed} km/h</p>
          </Tile>
          <Tile>
            <p className="metric-label">Humidity</p>
            <p className="metric-value">{current.humidity}%</p>
          </Tile>
          <Tile>
            <p className="metric-label">Pressure</p>
            <p className="metric-value">{current.pressure} hPa</p>
          </Tile>
        </div>
      </Column>
    </Grid>
  );
}
