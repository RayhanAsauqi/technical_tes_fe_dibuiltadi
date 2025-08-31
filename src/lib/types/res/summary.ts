type ItemDailyTransactionsRes = {
  date: string;
  amount: string;
};

type ItemMonthlyTransactionRes = {
  month: string;
  current: string;
  previous: string;
  growth: string;
};

type ItemYearlyTransactionsRes = {
  year: number;
  amount: string;
};

type Customer = {
  code: string;
  name: string;
  companyType: string;
};

export type ItemTopCustomersRes = {
  customer: Customer;
  amount: string;
};

export type DailyTransactionsRes = {
  responseCode: string;
  responseMessage: string;
  items: ItemDailyTransactionsRes[];
};

export type MonthlyTransactionRes = {
  responseCode: string;
  responseMessage: string;
  items: ItemMonthlyTransactionRes[];
};

export type YearlyTransactionsRes = {
  responseCode: string;
  responseMessage: string;
  percentage: string;
  current: ItemYearlyTransactionsRes;
  previous: ItemYearlyTransactionsRes;
};

export type TopCustomersRes = {
  responseCode: string;
  responseMessage: string;
  items: ItemTopCustomersRes[];
};
