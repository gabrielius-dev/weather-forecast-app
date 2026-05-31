import { useState, useEffect } from "react";
import { GlobalTheme } from "@carbon/react";
import AppShell from "./AppShell";

const THEMES = ["cds--white", "cds--g10", "cds--g90", "cds--g100"];

export default function App() {
  const [theme, setTheme] = useState("g100");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(...THEMES);
    root.classList.add(`cds--${theme}`);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((current) => (current === "g100" ? "g10" : "g100"));

  return (
    <GlobalTheme theme={theme}>
      <AppShell theme={theme} toggleTheme={toggleTheme} />
    </GlobalTheme>
  );
}
