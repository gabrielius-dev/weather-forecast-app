export function validateEvent(req, res, next) {
  const { cityName, admin1, country, latitude, longitude } = req.body ?? {};

  const errors = [];

  if (typeof cityName !== "string" || cityName.trim() === "") {
    errors.push("cityName must be a non-empty string");
  }
  if (country != null && typeof country !== "string") {
    errors.push("country must be a string");
  }
  if (admin1 != null && typeof admin1 !== "string") {
    errors.push("admin1 must be a string");
  }
  if (
    typeof latitude !== "number" ||
    Number.isNaN(latitude) ||
    latitude < -90 ||
    latitude > 90
  ) {
    errors.push("latitude must be a number between -90 and 90");
  }
  if (
    typeof longitude !== "number" ||
    Number.isNaN(longitude) ||
    longitude < -180 ||
    longitude > 180
  ) {
    errors.push("longitude must be a number between -180 and 180");
  }

  if (errors.length > 0) {
    return res
      .status(400)
      .json({ error: "Invalid event payload", details: errors });
  }

  next();
}
