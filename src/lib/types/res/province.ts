type ItemsProvinceRes = {
  code: string;
  name: string;
};

export type ProvinceRes = {
  responseCode: string;
  responseMessage: string;
  items: ItemsProvinceRes[];
};
