import { useEffect, useState } from "react";

const useSplash = (duration = 5000) => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return showSplash;
};

export default useSplash;