import { wmoToIcon } from "../utils/wmoToIcon";

const fillIcons = import.meta.glob("/node_modules/@meteocons/svg/fill/*.svg", {
  eager: true,
  query: "?url",
  import: "default",
});

function buildMap(modules) {
  return Object.fromEntries(
    Object.entries(modules).map(([path, url]) => [
      path.split("/").pop().replace(".svg", ""),
      url,
    ]),
  );
}

const ICONS = { fill: buildMap(fillIcons) };

export default function WeatherIcon({
  code,
  isDay = true,
  slug,
  size = 48,
  label = "",
}) {
  const name = slug ?? wmoToIcon(code, isDay);
  const src = ICONS.fill[name] ?? ICONS.fill["not-available"];

  return (
    <img
      src={src}
      width={size}
      height={size}
      alt={label}
      aria-hidden={label ? undefined : true}
      draggable={false}
    />
  );
}
