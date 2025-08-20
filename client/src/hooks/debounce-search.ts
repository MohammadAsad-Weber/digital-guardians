import { useRef, useState } from "react";

// Tuple: [current value, debounced value, onChange handler, clear handler]
type ReturnType = [
  string,
  string,
  (event: React.ChangeEvent<HTMLInputElement>) => void,
  () => void
];
function useDebounce(): ReturnType {
  // Ref to store the debounce timer ID
  const timerId = useRef<NodeJS.Timeout | undefined>(undefined);

  // States for current input value and its debounced version
  const [query, setQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");

  // Handles input change with debounce logic
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setQuery(value);

    // Clear existing timer if any
    if (timerId.current) clearTimeout(timerId.current);

    // Set new timer for updating the debounced value
    timerId.current = setTimeout(() => {
      const normalizedValue = value.toLowerCase();
      setDebounceQuery(normalizedValue);
    }, 300);
  };
  // Clears input and debounced value
  const handleClear = () => {
    setQuery("");
    if (timerId.current) clearTimeout(timerId.current);
    setDebounceQuery("");
  };

  // Return state values and handlers
  return [query, debounceQuery, handleSearch, handleClear];
}

export default useDebounce;
