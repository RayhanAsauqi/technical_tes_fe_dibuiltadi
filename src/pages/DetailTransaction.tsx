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

// Main DetailTransactionPage
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

  // Show loading state
  if (loading) {
    return <LoadingState handleBack={handleBack} />;
  }

  // Show error state if invoice is not found
  if (!invoice) {
    return <ErrorState handleBack={handleBack} />;
  }

  // Show main page with invoice data
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
              <p className="">{invoice.referenceNo}</p>
            </div>
          </div>
          <StatusBadge invoice={invoice} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <InvoiceInfo invoice={invoice} />
            <ProductTable items={invoice.items} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ImportantDates invoice={invoice} />
            <PaymentSummary invoice={invoice} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Component for status badge
const StatusBadge = ({ invoice }: { invoice: TransactionDetailRes }) => {
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

// Component for invoice information
const InvoiceInfo = ({ invoice }: { invoice: TransactionDetailRes }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center">
        <Building className="w-5 h-5 mr-2" />
        Invoice Information
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoField label="Reference No" value={invoice.referenceNo} />
        <InfoField label="Sales" value={invoice.sales} />
        <InfoField label="Customer Code" value={invoice.customer.code} />
        <InfoField label="Customer Name" value={invoice.customer.name} />
      </div>
    </CardContent>
  </Card>
);

// Component for information field
const InfoField = ({ label, value }: { label: string; value: string }) => (
  <div>
    <label className="text-sm font-medium text-gray-500">{label}</label>
    <p className="text-sm font-semibold">{value}</p>
  </div>
);

// Component for important dates
const ImportantDates = ({ invoice }: { invoice: TransactionDetailRes }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center">
        <Calendar className="w-5 h-5 mr-2" />
        Important Dates
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <InfoField label="Order Date" value={displayDateTime(invoice.dateOrder)} />
      <InfoField label="Due Date" value={displayDateTime(invoice.dateDue)} />
      <InfoField label="Created At" value={displayDateTime(invoice.createdAt)} />
      {invoice.paidAt && <InfoField label="Paid At" value={displayDateTime(invoice.paidAt)} />}
    </CardContent>
  </Card>
);

// Component for payment summary
const PaymentSummary = ({ invoice }: { invoice: TransactionDetailRes }) => {
  const taxAmount = Number(invoice.amountTotal) - Number(invoice.amountUntaxed);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CreditCard className="w-5 h-5 mr-2" />
          Payment Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <PaymentRow label="Subtotal" value={formatCurrency(invoice.amountUntaxed)} />
        <PaymentRow label="Tax" value={formatCurrency(taxAmount)} />
        <hr />
        <PaymentRow label="Total" value={formatCurrency(invoice.amountTotal)} isTotal />
        <PaymentRow
          label="Remaining Balance"
          value={formatCurrency(invoice.amountDue)}
          isHighlighted
        />
      </CardContent>
    </Card>
  );
};

// Component for payment summary row
const PaymentRow = ({
  label,
  value,
  isTotal = false,
  isHighlighted = false,
}: {
  label: string;
  value: string;
  isTotal?: boolean;
  isHighlighted?: boolean;
}) => {
  const textClass = isTotal
    ? "text-base font-semibold"
    : `text-sm ${isHighlighted ? "text-red-600 font-medium" : "text-gray-600"}`;

  return (
    <div className="flex justify-between">
      <span className={textClass}>{label}</span>
      <span className={textClass}>{value}</span>
    </div>
  );
};

// Component for product table
const ProductTable = ({ items }: { items: TransactionDetailRes["items"] }) => {
  const tableData = (items ?? []).map((item, idx) => ({
    id: idx,
    productName: item.productName,
    quantity: item.quantity,
    price: formatCurrency(item.price),
    discount: `${item.discount}%`,
    priceSubtotal: formatCurrency(item.priceSubtotal),
    marginSubtotal: formatCurrency(item.marginSubtotal),
  }));

  const columns = [
    { key: "productName", title: "Product Name" },
    { key: "quantity", title: "Quantity" },
    { key: "price", title: "Price" },
    { key: "discount", title: "Discount" },
    { key: "priceSubtotal", title: "Price Subtotal" },
    { key: "marginSubtotal", title: "Margin Subtotal" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <ShadcnTable
            rows={tableData}
            columns={columns}
            isLoading={false}
            emptyStateMessage="No products available"
          />
        </div>
      </CardContent>
    </Card>
  );
};

// Component for loading state
const LoadingState = ({ handleBack }: { handleBack: () => void }) => (
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
                <SkeletonField label="Reference No" />
                <SkeletonField label="Sales" />
                <SkeletonField label="Customer Code" />
                <SkeletonField label="Customer Name" />
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
              <SkeletonField label="Order Date" />
              <SkeletonField label="Due Date" />
              <SkeletonField label="Created At" />
              <SkeletonField label="Paid At" />
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
              <SkeletonPaymentRow label="Subtotal" />
              <SkeletonPaymentRow label="Tax" />
              <hr />
              <SkeletonPaymentRow label="Total" isTotal />
              <SkeletonPaymentRow label="Remaining Balance" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
);

// Component for skeleton field
const SkeletonField = ({ label }: { label: string }) => (
  <div>
    <label className="text-sm font-medium text-gray-500">{label}</label>
    <Skeleton className="h-5 w-full mt-1" />
  </div>
);

// Component for skeleton payment row
const SkeletonPaymentRow = ({ label, isTotal = false }: { label: string; isTotal?: boolean }) => (
  <div className="flex justify-between">
    <span className={isTotal ? "text-base font-semibold" : "text-sm text-gray-600"}>{label}</span>
    <Skeleton className={isTotal ? "h-5 w-24" : "h-4 w-20"} />
  </div>
);

// Component for error state
const ErrorState = ({ handleBack }: { handleBack: () => void }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-2">Invoice not found</h2>
      <p className="mb-4">The requested invoice data is not available.</p>
      <Button onClick={handleBack} variant="outline">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>
    </div>
  </div>
);
