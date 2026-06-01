import { ClickableTile } from "@carbon/react";

export default function MostViewedCities({ topCities, onSelect }) {
  return (
    <div className="most-viewed">
      <p className="most-viewed-label">Frequently viewed</p>
      <div className="most-viewed-grid">
        {topCities.map((city) => (
          <ClickableTile
            key={city.id}
            className="most-viewed-tile"
            onClick={() => onSelect(city)}
          >
            <span className="most-viewed-name">{city.name}</span>
            <span className="most-viewed-region">
              {[city.admin1, city.country].filter(Boolean).join(", ")}
            </span>
          </ClickableTile>
        ))}
      </div>
    </div>
  );
}
