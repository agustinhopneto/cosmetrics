export type Category = {
  id: number;
  name: string;
  color: string;
  description?: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

export namespace Category {
  export type Create = Pick<Category, 'name' | 'color' | 'description'>;
  export type Filters = Pick<Category, 'name'>;
  export type Update = Pick<Category, 'id' | 'name' | 'color' | 'description'>;
}
