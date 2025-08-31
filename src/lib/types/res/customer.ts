type Group = {
  code: string;
  name: string;
};

type Province = {
  code: string;
  name: string;
};

type City = {
  code: string;
  name: string;
};

type ItemCostumerRes = {
  code: string;
  name: string;
  type: string;
  companyType: string;
  area: string;
  province: string;
  city: string;
  address: string;
  group: Group;
  status: string;
  target: string;
  achievement: string;
  percentage: string;
  createdAt: string;
};

export type CustomerRes = {
  responseCode: string;
  responseMessage: string;
  items: ItemCostumerRes[];
  currentPage: string;
  lastPage: string;
  perPage: string;
  total: string;
};

export type CustomerDetailRes = {
  responseCode: string;
  responseMessage: string;
  code: string;
  name: string;
  type: "EXISTING" | "PROSPECT";
  companyType: "person" | "company";
  identityNo: string;
  npwp: string | null;
  email: string | null;
  phone: string | null;
  mobilePhone: string | null;
  area: string;
  province: Province;
  city: City;
  address: string;
  group: Group;
  status: string | null;
  target: string;
  achievement: string;
  percentage: string;
  createdAt: string;
};
