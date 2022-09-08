export const clearFilters = (filters: Record<string, unknown>) => {
  return Object.entries(filters).reduce(
    (acc: Record<string, unknown>, [key, value]) => {
      if (value) {
        acc[key] = value;
      }
      return acc;
    },
    {}
  );
};
