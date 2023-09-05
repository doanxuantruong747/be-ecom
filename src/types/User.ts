export type QueryCustomerGetNotFollow = {
  page: number;
  limit: number;
};

export type QueryCustomerCheckFollow = {
  storeId: number;
};

export type CreateUser = {
  email: string;
  userName: string;
  password: string;
  role: string;
};
