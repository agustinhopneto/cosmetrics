export type Paginated<T> = {
  total: number;
  totalPages: number;
  result: T[];
};
