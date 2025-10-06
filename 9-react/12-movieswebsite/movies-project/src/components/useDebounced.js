import { useState, useEffect } from "react";
export function useDebounced(value, delay) {
  console.log(value);
  const [debounced, setDebounced] = useState("");
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => clearTimeout(handler); // تنظيف الـ timeout عند تغير value
  }, [value, delay]);

  return debounced;
}
