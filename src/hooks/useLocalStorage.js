import { useState, useEffect } from "react";

/**
 * Custom hook that behaves like useState, but automatically
 * reads from and writes to localStorage so data survives a refresh.
 *
 * @param {string} key - the localStorage key to store data under
 * @param {*} initialValue - the default value if nothing is saved yet
 */
function useLocalStorage(key, initialValue) {
  // Lazy initializer: only runs ONCE on first render, not every re-render.
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage key:", key, error);
      return initialValue;
    }
  });

  // useEffect runs AFTER every render where `value` or `key` changed.
  // This is what actually persists the data to localStorage.
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error writing localStorage key:", key, error);
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
