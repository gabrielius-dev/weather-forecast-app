import { Column, Grid, SkeletonPlaceholder } from "@carbon/react";

export default function WeatherSkeleton() {
  return (
    <>
      <Grid>
        <Column sm={4} md={4} lg={8} className="hero-column">
          <SkeletonPlaceholder className="skeleton-conditions" />
        </Column>
        <Column sm={4} md={4} lg={8}>
          <SkeletonPlaceholder className="skeleton-conditions" />
        </Column>
      </Grid>
      <Grid>
        <Column sm={4} md={8} lg={16}>
          <SkeletonPlaceholder className="skeleton-hourly" />
        </Column>
      </Grid>
      <Grid>
        <Column sm={4} md={8} lg={16}>
          <div className="forecast-grid">
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonPlaceholder key={i} className="skeleton-forecast" />
            ))}
          </div>
        </Column>
      </Grid>
    </>
  );
}
