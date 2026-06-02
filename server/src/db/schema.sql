CREATE TABLE IF NOT EXISTS city_selection_events (
  id          BIGSERIAL PRIMARY KEY,
  city_name   TEXT NOT NULL,
  admin1      TEXT,
  country     TEXT,
  latitude    DOUBLE PRECISION NOT NULL,
  longitude   DOUBLE PRECISION NOT NULL,
  selected_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  user_agent  TEXT,
  client_ip   INET
);

CREATE INDEX IF NOT EXISTS idx_city_events_time
  ON city_selection_events (selected_at);

CREATE INDEX IF NOT EXISTS idx_city_events_city
  ON city_selection_events (city_name);