import { useState, useEffect } from "react";
import {
  Column,
  Content,
  GlobalTheme,
  Grid,
  InlineLoading,
  InlineNotification,
  Stack,
} from "@carbon/react";
import AppShell from "./AppShell";
import CitySearch from "./components/CitySearch";
import { fetchWeather } from "./services/weatherAPI";
import CurrentConditions from "./components/CurrentConditions";
import ForecastList from "./components/ForecastList";

const THEMES = ["cds--white", "cds--g10", "cds--g90", "cds--g100"];

export default function App() {
  const [theme, setTheme] = useState("g100");
  const [selectedCity, setSelectedCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(...THEMES);
    root.classList.add(`cds--${theme}`);
  }, [theme]);

  useEffect(() => {
    if (!selectedCity) return;

    async function loadWeather() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWeather(selectedCity);
        setWeather(data);
        console.log(data);
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
  }

  return (
    <GlobalTheme theme={theme}>
      <AppShell theme={theme} toggleTheme={toggleTheme} />
      <Content>
        <Stack gap={6}>
          <Grid>
            <Column sm={4} md={8} lg={8}>
              <CitySearch onCitySelect={handleCitySelect} />
            </Column>
          </Grid>
          {loading && <InlineLoading description="Loading weather…" />}
          {error && (
            <InlineNotification
              kind="error"
              lowContrast
              title="Error"
              subtitle={error}
            />
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
