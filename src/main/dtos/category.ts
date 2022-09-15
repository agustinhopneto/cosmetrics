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
}
