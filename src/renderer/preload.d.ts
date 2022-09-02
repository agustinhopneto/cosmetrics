import { CreateProviderDTO, Provider } from '../main/dtos/provider';

declare global {
  interface Window {
    api: {
      hello: (message: string) => Promise<string>;
      providers: {
        create: (provider: CreateProviderDTO) => Promise<Provider>;
        list: (page: number, limit: number) => Promise<Provider[]>;
      };
    };
  }
}

export {};
