import { ComboBox } from "@carbon/react";
import { useRef, useState } from "react";
import { searchCities } from "../services/geocodingApi";

export default function CitySearch({ onCitySelect }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const debounceTimer = useRef();

  async function handleInputChange(input) {
    clearTimeout(debounceTimer.current);

    if (input.length < 2) {
      setItems([]);
      return;
    }

    debounceTimer.current = setTimeout(async () => {
      setError(null);
      try {
        setItems(await searchCities(input));
      } catch (e) {
        setError(e.message);
      }
    }, 300);
  }

  function handleChange({ selectedItem }) {
    if (selectedItem) onCitySelect(selectedItem);
  }

  return (
    <ComboBox
      id="city-search"
      titleText="City"
      placeholder="Search for a city…"
      items={items}
      itemToString={(item) => {
        if (!item) return "";
        const parts = [item.name, item.admin1, item.country].filter(Boolean);
        return parts.join(", ");
      }}
      onInputChange={handleInputChange}
      onChange={handleChange}
      shouldFilterItem={() => true}
      invalid={!!error}
      invalidText={error ?? ""}
    />
  );
}
