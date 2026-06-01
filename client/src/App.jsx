import { useState, useEffect } from "react";
import {
  Column,
  Content,
  GlobalTheme,
  Grid,
  InlineNotification,
  Stack,
} from "@carbon/react";
import AppShell from "./AppShell";
import CitySearch from "./components/CitySearch";
import { fetchWeather } from "./services/weatherAPI";
import CurrentConditions from "./components/CurrentConditions";
import ForecastList from "./components/ForecastList";
import useMostViewed from "./hooks/useMostViewed";
import MostViewedCities from "./components/MostViewedCities";
import WeatherSkeleton from "./components/WeatherSkeleton";

const THEMES = ["cds--white", "cds--g10", "cds--g90", "cds--g100"];

export default function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("wf:theme") ?? "g100";
    } catch {
      return "g100";
    }
  });
  const [selectedCity, setSelectedCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { topCities, recordView } = useMostViewed();
  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    if (!loading) return;

    const timer = setTimeout(() => setShowSkeleton(true), 200);
    return () => {
      clearTimeout(timer);
      setShowSkeleton(false);
    };
  }, [loading]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(...THEMES);
    root.classList.add(`cds--${theme}`);

    try {
      localStorage.setItem("wf:theme", theme);
    } catch {
      // storage unavailable; ignore
    }
  }, [theme]);

  useEffect(() => {
    if (!selectedCity) return;

    async function loadWeather() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWeather(selectedCity);
        setWeather(data);
      } catch (e) {
        setError(e.message);
        setWeather(null);
      } finally {
        setLoading(false);
      }
    }

    loadWeather();
  }, [selectedCity]);

  const toggleTheme = () =>
    setTheme((current) => (current === "g100" ? "g10" : "g100"));

  function handleCitySelect(city) {
    setSelectedCity(city);
    setWeather(null);
    recordView(city);
  }

  return (
    <GlobalTheme theme={theme}>
      <AppShell theme={theme} toggleTheme={toggleTheme} />
      <Content>
        <Stack gap={6}>
          <Grid className="search-row">
            <Column sm={4} md={8} lg={8}>
              <CitySearch onCitySelect={handleCitySelect} />
            </Column>
            {topCities.length > 0 && (
              <Column sm={4} md={8} lg={8}>
                <MostViewedCities
                  topCities={topCities}
                  onSelect={handleCitySelect}
                />
              </Column>
            )}
          </Grid>
          {showSkeleton && <WeatherSkeleton />}
          {error && (
            <Grid>
              <Column sm={4} md={8} lg={16}>
                <InlineNotification
                  kind="error"
                  lowContrast
                  title="Error"
                  subtitle={error}
                />
              </Column>
            </Grid>
          )}
          {weather && !loading && (
            <>
              <CurrentConditions
                city={selectedCity}
                current={weather.current}
              />
              <ForecastList
                daily={weather.daily.slice(1)}
                hourlyByDay={weather.hourlyByDay}
              />
            </>
          )}
        </Stack>
      </Content>
    </GlobalTheme>
  );
}
