export const getStorageKey = (query: object, storageKey: string) => {
  const filledKeys = Object.entries(query).filter(([_, value]) => {
    return value !== "";
  });

  const keys = filledKeys.map(([key, value]) => {
    return `${key}:${value}`;
  });

  return `${storageKey}-${keys.join(",")}`;
};
