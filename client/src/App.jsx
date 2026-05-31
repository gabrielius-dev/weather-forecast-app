import { useState, useEffect } from "react";
import { GlobalTheme } from "@carbon/react";
import AppShell from "./AppShell";
import CitySearch from "./components/CitySearch";

const THEMES = ["cds--white", "cds--g10", "cds--g90", "cds--g100"];

export default function App() {
  const [theme, setTheme] = useState("g100");
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(...THEMES);
    root.classList.add(`cds--${theme}`);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((current) => (current === "g100" ? "g10" : "g100"));

  function handleCitySelect(city) {
    setSelectedCity(city);
  }

  return (
    <GlobalTheme theme={theme}>
      <AppShell theme={theme} toggleTheme={toggleTheme} />
      <main>
        <CitySearch onCitySelect={handleCitySelect} />
      </main>
    </GlobalTheme>
  );
}
