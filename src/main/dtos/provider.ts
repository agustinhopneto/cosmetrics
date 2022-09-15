export type Provider = {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

export namespace Provider {
  export type Create = Pick<Provider, 'name' | 'email' | 'phone'>;
  export type Update = Pick<Provider, 'id' | 'name' | 'email' | 'phone'>;
  export type Filters = Pick<Provider, 'email' | 'phone'> & {
    name?: string;
  };
}
