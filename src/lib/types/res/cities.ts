type ItemCitiesRes = {
  code: string;
  name: string;
};

export type CitiesRes = {
  responseCode: string;
  responseMessage: string;
  items: ItemCitiesRes[];
};
