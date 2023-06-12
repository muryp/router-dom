export interface Router {
  url: string;
  callback: (arg?: any) => string;
  listLink?: (url: string) => string[]
}

