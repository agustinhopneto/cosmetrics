declare global {
  interface Window {
    api: {
      hello: (message: string) => Promise<string>;
    };
  }
}

export {};
