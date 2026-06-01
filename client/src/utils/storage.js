const KEY = "wf:cityViews";

export function readCityViews() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? {};
  } catch {
    return {};
  }
}

export function writeCityViews(views) {
  try {
    localStorage.setItem(KEY, JSON.stringify(views));
  } catch {
    // storage unavailable; ignore
  }
}
