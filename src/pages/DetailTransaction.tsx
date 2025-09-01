import { useNavigate, useParams } from "react-router-dom";
import ShadcnTable from "@/components/container/shadcn-table";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFetch } from "@/hooks/use-fetch";
import { API_ENDPOINT } from "@/lib/constants/endpoint";
import type { TransactionDetailRes } from "@/lib/types/res/transactions";
import { formatCurrency } from "@/utils/format-currency";
import { ArrowLeft, Building, Calendar, CreditCard } from "lucide-react";
import { displayDateTime } from "@/utils/date";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function DetailTransactionPage() {
  const navigate = useNavigate();
  const { no } = useParams<{ no: string }>();

  const { data: invoice, loading } = useFetch<TransactionDetailRes>(
    `${API_ENDPOINT}/transactions/${no}`
  );

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const invoiceItems = (items: TransactionDetailRes["items"]) => {
    return (items ?? []).map((item, idx) => ({
      id: idx,
      productName: item.productName,
      quantity: item.quantity,
      price: formatCurrency(item.price),
      discount: `${item.discount}%`,
      priceSubtotal: formatCurrency(item.priceSubtotal),
      marginSubtotal: formatCurrency(item.marginSubtotal),
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={handleBack}
                className="mb-2 flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Invoice Detail</h1>
                <Skeleton className="h-4 w-32 mt-1" />
              </div>
            </div>
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Invoice Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building className="w-5 h-5 mr-2" />
                    Invoice Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Reference No</label>
                      <Skeleton className="h-5 w-full mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Sales</label>
                      <Skeleton className="h-5 w-full mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Customer Code</label>
                      <Skeleton className="h-5 w-full mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Customer Name</label>
                      <Skeleton className="h-5 w-full mt-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Product Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <ShadcnTable
                      rows={[]}
                      columns={[
                        { key: "productName", title: "Product Name" },
                        { key: "quantity", title: "Quantity" },
                        { key: "price", title: "Price" },
                        { key: "discount", title: "Discount" },
                        { key: "priceSubtotal", title: "Price Subtotal" },
                        { key: "marginSubtotal", title: "Margin Subtotal" },
                      ]}
                      isLoading={true}
                      emptyStateMessage="Loading products..."
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Important Dates
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Order Date</label>
                    <Skeleton className="h-4 w-full mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Due Date</label>
                    <Skeleton className="h-4 w-full mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Created At</label>
                    <Skeleton className="h-4 w-full mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Paid At</label>
                    <Skeleton className="h-4 w-full mt-1" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Payment Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Subtotal</span>
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Tax</span>
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <hr />
                  <div className="flex justify-between">
                    <span className="text-base font-semibold">Total</span>
                    <Skeleton className="h-5 w-24" />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Remaining Balance</span>
                    <Skeleton className="h-4 w-20" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold  mb-2">Invoice not found</h2>
          <p className=" mb-4">The requested invoice data is not available.</p>
          <Button onClick={handleBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="mb-2 flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold ">Invoice Detail</h1>
              <p className="">{invoice.referenceNo}</p>
            </div>
          </div>
          {getStatusBadge(invoice)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Invoice Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  Invoice Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Reference No</label>
                    <p className="text-sm font-semibold">{invoice.referenceNo}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Sales</label>
                    <p className="text-sm">{invoice.sales}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Customer Code</label>
                    <p className="text-sm">{invoice.customer.code}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Customer Name</label>
                    <p className="text-sm">{invoice.customer.name}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Items */}
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <ShadcnTable
                    rows={invoiceItems(invoice.items)}
                    columns={[
                      { key: "productName", title: "Product Name" },
                      { key: "quantity", title: "Quantity" },
                      { key: "price", title: "Price" },
                      { key: "discount", title: "Discount" },
                      { key: "priceSubtotal", title: "Price Subtotal" },
                      { key: "marginSubtotal", title: "Margin Subtotal" },
                    ]}
                    isLoading={false}
                    emptyStateMessage="No products available"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Important Dates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Order Date</label>
                  <p className="text-sm">{displayDateTime(invoice.dateOrder)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Due Date</label>
                  <p className="text-sm">{displayDateTime(invoice.dateDue)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Created At</label>
                  <p className="text-sm">{displayDateTime(invoice.createdAt)}</p>
                </div>
                {invoice.paidAt && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Paid At</label>
                    <p className="text-sm">{displayDateTime(invoice.paidAt)}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <span className="text-sm font-medium">
                    {formatCurrency(invoice.amountUntaxed)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Tax</span>
                  <span className="text-sm font-medium">
                    {formatCurrency(Number(invoice.amountTotal) - Number(invoice.amountUntaxed))}
                  </span>
                </div>
                <hr />
                <div className="flex justify-between">
                  <span className="text-base font-semibold">Total</span>
                  <span className="text-base font-bold ">
                    {formatCurrency(invoice.amountTotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Remaining Balance</span>
                  <span className="text-sm font-medium text-red-600">
                    {formatCurrency(invoice.amountDue)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

const getStatusBadge = (invoice: TransactionDetailRes) => {
  let status: "paid" | "unpaid" | "partial" = "unpaid";

  if (Number(invoice.amountDue) === 0 || invoice.paidAt) {
    status = "paid";
  } else if (Number(invoice.amountDue) < Number(invoice.amountTotal)) {
    status = "partial";
  }

  const statusConfig = {
    paid: { label: "Paid", variant: "default" as const },
    unpaid: { label: "Unpaid", variant: "destructive" as const },
    partial: { label: "Partially Paid", variant: "secondary" as const },
  };

  const config = statusConfig[status];

  return <Badge variant={config.variant}>{config.label}</Badge>;
};
