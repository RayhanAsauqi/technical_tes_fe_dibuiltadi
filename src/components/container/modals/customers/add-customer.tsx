import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useDisclosure from "@/hooks/use-disclosure";
import { alertSuccess } from "@/utils/alert";
import { useRef } from "react";
import type { CustomerFormRef } from "../../form/customer/add-customer";
import CustomerForm from "../../form/customer/add-customer";

type AddCustomerProps = {
  isOpen: boolean;
  setIsOpenAction: (open: boolean) => void;
  refreshCb: () => void;
};

export default function AddCustomerModal(props: AddCustomerProps) {
  const { isOpen, setIsOpenAction } = useDisclosure();
  const formRef = useRef<CustomerFormRef>(null);

  return (
    <Dialog
      open={props.isOpen ? props.isOpen : isOpen}
      onOpenChange={props.setIsOpenAction ? props.setIsOpenAction : setIsOpenAction}
    >
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Add Customer</DialogTitle>
        </DialogHeader>
        <div className="max-h-96 w-full overflow-y-auto py-3 px-2 ">
          <div className="w-full grid grid-cols-1 gap-2">
            <CustomerForm
              ref={formRef}
              onSuccess={() => alertSuccess("Customer Created!", "bottom-right")}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => formRef.current?.submitForm()}
            disabled={formRef.current?.isSubmitting}
          >
            Submit
          </Button>
          <DialogClose asChild>
            <Button variant="destructive">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
