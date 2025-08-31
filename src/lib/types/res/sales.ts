type ItemSalesRes = {
  code: string;
  name: string;
};

export type SalesRes = {
  responseCode: string;
  responseMessage: string;
  items: ItemSalesRes[];
};
