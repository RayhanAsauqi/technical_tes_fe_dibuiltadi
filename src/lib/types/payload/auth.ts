export type RegisterPayload = {
  name: string;
  phone: string;
  email: string;
  address: string;
  password: string;
};

export type LoginPayload = {
  phone: string;
  password: string;
};
