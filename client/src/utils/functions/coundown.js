import { useEffect } from "react";
import { useState } from "react";

export const countdown = (duration) => {
  const [countdown, setCountdown] = useState(duration);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevState) => {
        if (prevState <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevState - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return countdown;
};
