type Customer = {
  code: string;
  name: string;
};

type ItemTransactionsRes = {
  referenceNo: string;
  customer: Customer;
  sales: string;
  amountDue: string;
  amountUntaxed: string;
  amountTotal: string;
  dateOrder: string;
  dateDue: string;
  paidAt: string;
  createdAt: string;
};

type ItemDetailTransactionRes = {
  productName: string;
  quantity: string;
  price: string;
  discount: string;
  priceSubtotal: string;
  marginSubtotal: string;
};

export type TransactionsRes = {
  responseCode: string;
  responseMessage: string;
  items: ItemTransactionsRes[];
  currentPage: string;
  lastPage: string;
  perPage: string;
  total: string;
};

export type TransactionDetailRes = {
  responseCode: string;
  responseMessage: string;
  referenceNo: string;
  customer: Customer;
  sales: string;
  items: ItemDetailTransactionRes[];
  amountDue: string;
  amountUntaxed: string;
  amountTotal: string;
  dateOrder: string;
  dateDue: string;
  paidAt: string;
  createdAt: string;
};
