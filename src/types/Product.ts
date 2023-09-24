export type QueryCustomerGetNotFollow = {
  page: number;
  limit: number;
};

export type QueryCustomerCheckFollow = {
  storeId: number;
};

export type CreateProduct = {
  email: string;
  userName: string;
  password: string;
  role: string;
};
