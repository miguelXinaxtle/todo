import { useState, useEffect } from "react";

// Hook timer
const useTimer = (initValue = 30) => {
  const [value, setValue] = useState(initValue);
  const [auto, setAuto] = useState(false);

  // Funciones base
  const next = () => setValue((prev) => prev - 1);
  const change = (newValue) => setValue(newValue);
  const reset = () => setValue(0);
  const start = (_) => setAuto(true);
  const stop = (_) => setAuto(false);

  useEffect(() => {
    const interval = setInterval((_) => {
      if (auto && value > 0) {
        next();
      } else {
      }
    }, 1000);
    return (_) => clearInterval(interval);
  });

  // Respuesta del hook
  return [value, next, change, reset, start, stop];
};

export default useTimer;
