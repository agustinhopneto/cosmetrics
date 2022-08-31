export type Provider = {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

export type CreateProviderDTO = Pick<Provider, 'name' | 'email' | 'phone'>;
