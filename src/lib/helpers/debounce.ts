export function debounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
) {
  let timeoutId: NodeJS.Timeout;

  const debouncedFunction = (...args: Parameters<T>) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  debouncedFunction.cancel = () => {
    clearTimeout(timeoutId);
  };

  return debouncedFunction;
}