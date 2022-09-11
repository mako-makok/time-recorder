import { useEffect, useState } from "react";

const useTime = (interval: number) => {
  const [time, updateTime] = useState(Date.now());

  useEffect(() => {
    const timeoutId = setTimeout(() => updateTime(Date.now()), interval);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [time]);

  return time;
};

export { useTime };
