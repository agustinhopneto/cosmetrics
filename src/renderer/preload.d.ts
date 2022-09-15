import { Paginated } from 'main/dtos';
import { Category } from 'main/dtos/category';
import { Provider } from '../main/dtos/provider';

declare global {
  interface Window {
    api: {
      hello: (message: string) => Promise<string>;
      providers: {
        create: (provider: Provider.Create) => Promise<Provider>;
        list: (
          page: number,
          limit: number,
          filters?: Provider.Filters
        ) => Promise<Paginated<Provider>>;
        update: (provider: Provider.Update) => Promise<Provider>;
      };
      categories: {
        create: (category: Category.Create) => Promise<Category>;
      };
    };
  }
}

export {};
