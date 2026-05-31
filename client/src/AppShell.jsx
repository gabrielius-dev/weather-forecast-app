import {
  Header,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderName,
} from "@carbon/react";
import { Asleep, Light } from "@carbon/icons-react";

export default function AppShell({ theme, toggleTheme }) {
  const isDark = theme === "g100";

  return (
    <Header aria-label="Weather Forecast">
      <HeaderName href="#" prefix="IBM">
        Weather Forecast
      </HeaderName>
      <HeaderGlobalBar>
        <HeaderGlobalAction
          aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
          onClick={toggleTheme}
          tooltipAlignment="end"
        >
          {isDark ? <Light size={20} /> : <Asleep size={20} />}
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </Header>
  );
}
