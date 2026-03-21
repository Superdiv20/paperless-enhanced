export interface SearchResult<T> {
  count: number;

  results: T[];

  all: number[];
}
