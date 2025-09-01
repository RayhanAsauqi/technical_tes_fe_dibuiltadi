import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useDisclosure from "@/hooks/use-disclosure";
import { useFetch } from "@/hooks/use-fetch";
import { API_ENDPOINT } from "@/lib/constants/endpoint";
import type { CustomerDetailRes } from "@/lib/types/res/customer";
import { displayDateTime } from "@/utils/date";
import { normalizePercentage } from "@/utils/percantage";

type DetailCustomerProps = {
  isOpen: boolean;
  setIsOpenAction: (isOpen: boolean) => void;
  code: string;
};

export default function DetailCustomerModal(props: DetailCustomerProps) {
  const { isOpen, setIsOpenAction } = useDisclosure();
  const { data, loading } = useFetch<CustomerDetailRes>(`${API_ENDPOINT}/customers/${props.code}`);

  return (
    <Dialog
      open={props.isOpen ? props.isOpen : isOpen}
      onOpenChange={props.setIsOpenAction ? props.setIsOpenAction : setIsOpenAction}
    >
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Customer Detail</DialogTitle>
        </DialogHeader>
        <div className="max-h-96 w-full overflow-y-auto py-3 px-2">
          <div className="w-full grid grid-cols-1 gap-2">
            <>
              {loading && (
                <div className="absolute top-0 left-0 w-full h-full bg-white/50 backdrop-blur-[1px] rounded-xl z-30"></div>
              )}
              <Label>Code</Label>
              <Input value={data?.code} disabled />
              <Label>Name</Label>
              <Input value={data?.name} disabled />
              <Label>Type</Label>
              <Input value={data?.type} disabled />
              <Label>Company Type</Label>
              <Input value={data?.companyType} disabled />
              <Label>No Identity</Label>
              <Input value={data?.identityNo} disabled />
              <Label>NPWP</Label>
              <Input value={data?.npwp ?? "-"} disabled />
              <Label>Email</Label>
              <Input value={data?.email ?? "-"} disabled />
              <Label>Phone</Label>
              <Input value={data?.phone ?? "-"} disabled />
              <Label>Mobile Phone</Label>
              <Input value={data?.mobilePhone ?? "-"} disabled />
              <Label>Area</Label>
              <Input value={data?.area ?? "-"} disabled />
              <Label>Province</Label>
              <Input value={data?.province.name ?? "-"} disabled />
              <Label>City</Label>
              <Input value={data?.city.name ?? "-"} disabled />
              <Label>Address</Label>
              <Textarea value={data?.address ?? "-"} disabled />
              <Label>Status</Label>
              <Input value={data?.status ?? "-"} disabled />
              <Label>Target</Label>
              <Input value={data?.target ?? "-"} disabled />
              <Label>Achievement</Label>
              <Input value={data?.achievement ?? "-"} disabled />
              <Label>Percentage</Label>
              <Input value={`${normalizePercentage(Number(data?.percentage)) ?? "-"}%`} disabled />
              <Label>Created At</Label>
              <Input value={displayDateTime(data?.createdAt ?? "") ?? "-"} disabled />
            </>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="destructive">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
