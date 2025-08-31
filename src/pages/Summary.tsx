import Summary from "@/components/container/summary";
import DefaultLayout from "@/components/layouts/default-layout";

export default function SummaryPage() {
  return (
    <DefaultLayout pageTitle="Summary" subTitle="Overview of your sales performance and analytics">
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <Summary />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
