import useDisclosure from "@/hooks/use-disclosure";
import { useRef } from "react";
import type { EditCustomerFormRef } from "../../form/customer/edit-customer";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EditCustomerForm from "../../form/customer/edit-customer";
import { alertSuccess } from "@/utils/alert";
import { Button } from "@/components/ui/button";

type EditCustomerProps = {
  isOpen: boolean;
  setIsOpenAction: (open: boolean) => void;
  refreshCb: () => void;
  code: string;
};

export default function EditCustomerModal(props: EditCustomerProps) {
  const { isOpen, setIsOpenAction } = useDisclosure();
  const formRef = useRef<EditCustomerFormRef>(null);

  return (
    <Dialog
      open={props.isOpen ? props.isOpen : isOpen}
      onOpenChange={props.setIsOpenAction ? props.setIsOpenAction : setIsOpenAction}
    >
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Edit Customer</DialogTitle>
        </DialogHeader>
        <div className="max-h-96 w-full overflow-y-auto py-3 px-2 ">
          <div className="w-full grid grid-cols-1 gap-2">
            <EditCustomerForm
              ref={formRef}
              onSuccess={() => alertSuccess("Customer Updated!", "bottom-right")}
              code={props.code}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => formRef.current?.submitForm()}
            disabled={formRef.current?.isSubmitting}
          >
            Save
          </Button>
          <DialogClose asChild>
            <Button variant="destructive">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
