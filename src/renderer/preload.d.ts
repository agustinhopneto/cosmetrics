declare global {
  interface Window {
    api: {
      hello: (message: string) => Promise<string>;
      providers: {
        create: () => Promise<Record<string, unknown>>;
      };
    };
  }
}

export {};
