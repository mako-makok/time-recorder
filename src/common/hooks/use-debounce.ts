import { useRef } from "react";

type UseDebounce = (fn: () => void, timeoutValue?: number) => UseDebounceReturn;
type UseDebounceReturn = (e: Event) => void;

const useDebounce: UseDebounce = (fn, timeoutValue = 1000) => {
  const processing = useRef(false);

  const denoucedHandler: UseDebounceReturn = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();

    if (processing.current) return;

    fn();

    processing.current = true;

    setTimeout(() => {
      processing.current = false;
    }, timeoutValue);
  };

  return denoucedHandler;
};

export { useDebounce };
