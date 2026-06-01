import { useState } from "react";
import ForecastCard from "./ForecastCard";
import { Column, Grid } from "@carbon/react";

export default function ForecastList({ daily, hourlyByDay }) {
  const [expandedDate, setExpandedDate] = useState(null);

  return (
    <Grid>
      <Column sm={4} md={8} lg={16}>
        <div className="forecast-grid">
          {daily.map((day) => (
            <ForecastCard
              key={day.date}
              day={day}
              hourly={(hourlyByDay[day.date] ?? []).filter(
                (_, i) => i % 3 === 0,
              )}
              expanded={expandedDate === day.date}
              onToggle={() =>
                setExpandedDate((prev) => (prev === day.date ? null : day.date))
              }
            />
          ))}
        </div>
      </Column>
    </Grid>
  );
}
