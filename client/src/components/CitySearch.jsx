import { ComboBox } from "@carbon/react";
import { useRef, useState } from "react";
import { searchCities } from "../services/geocodingApi";

export default function CitySearch({ onCitySelect }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const debounceTimer = useRef();

  async function handleInputChange(input) {
    clearTimeout(debounceTimer.current);

    if (input.length < 2) {
      setItems([]);
      return;
    }

    debounceTimer.current = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        setItems(await searchCities(input));
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
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
      itemToString={(item) =>
        item
          ? `${item.name}${item.admin1 ? `, ${item.admin1}` : ""}, ${item.country}`
          : ""
      }
      onInputChange={handleInputChange}
      onChange={handleChange}
      shouldFilterItem={() => true}
      warn={loading}
      warnText="Searching…"
      invalid={!!error}
      invalidText={error ?? ""}
    />
  );
}
