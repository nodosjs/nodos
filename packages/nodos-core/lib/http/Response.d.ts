export interface Response {
  options: Object;
  head(code: string | number): void;
}
