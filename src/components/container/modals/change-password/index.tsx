import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useDisclosure from "@/hooks/use-disclosure";
import type { ChangePasswordFormRef } from "../../form/change-password";
import { useRef } from "react";
import ChangePasswordForm from "../../form/change-password";
import { alertSuccess } from "@/utils/alert";
import { Button } from "@/components/ui/button";

type ChangePasswordProps = {
  isOpen: boolean;
  setIsOpenAction: (val: boolean) => void;
};

export default function ChangePasswordModal(props: ChangePasswordProps) {
  const { isOpen, setIsOpenAction } = useDisclosure();
  const formRef = useRef<ChangePasswordFormRef>(null);
  return (
    <Dialog
      open={props.isOpen ? props.isOpen : isOpen}
      onOpenChange={props.setIsOpenAction ? props.setIsOpenAction : setIsOpenAction}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>Enter your current password and choose a new one.</DialogDescription>
        </DialogHeader>
        <div className="max-h-96 w-full overflow-y-auto py-3 px-2">
          <div className="w-full grid grid-cols-1 gap-2">
            <ChangePasswordForm
              ref={formRef}
              onSuccess={() => {
                alertSuccess("Password Success Updated!", "bottom-right");
                props.setIsOpenAction(false);
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="destructive">Close</Button>
          </DialogClose>
          <Button
            onClick={() => formRef.current?.submitForm()}
            disabled={formRef.current?.isSubmitting}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
