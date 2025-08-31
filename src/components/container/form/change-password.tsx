import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangePassword } from "@/lib/api/auth-api";
import { ExtendedError } from "@/lib/extended-error";
import {
  changePasswordSchema,
  type FormChangePasswordSchema,
} from "@/lib/validation/change-password";
import { alertError } from "@/utils/alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";

export type ChangePasswordFormRef = {
  submitForm: () => void;
  isSubmitting: boolean;
};

type ChangePasswordFormProps = {
  onSuccess?: () => void;
};

const ChangePasswordForm = forwardRef<ChangePasswordFormRef, ChangePasswordFormProps>(
  ({ onSuccess }, ref) => {
    const [show, setShow] = useState({
      current: false,
      new: false,
      confirm: false,
    });
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);

    const form = useForm<FormChangePasswordSchema>({
      resolver: zodResolver(changePasswordSchema),
      defaultValues: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
    });

    async function onSubmit(values: FormChangePasswordSchema) {
      setSubmitLoading(true);
      try {
        await ChangePassword({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
          newPasswordConfirmation: values.confirmPassword,
        });
        onSuccess?.();
      } catch (error: any) {
        if (error instanceof ExtendedError) {
          if (error.isValidationError() && error.errors) {
            Object.entries(error.errors).forEach(([key, message]) => {
              form.setError(key as keyof FormChangePasswordSchema, {
                type: "server",
                message: String(message),
              });
            });
          } else {
            alertError(error.responseMessage);
          }
        } else {
          alertError("Login failed. Please try again.");
          console.error("Login error:", error);
        }
        console.log(error);
      } finally {
        setSubmitLoading(false);
      }
    }

    useImperativeHandle(ref, () => ({
      submitForm: () => form.handleSubmit(onSubmit)(),
      isSubmitting: submitLoading,
    }));

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Current Password */}
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="current-password">Current Password</Label>
                <div className="relative">
                  <FormControl>
                    <Input
                      id="current-password"
                      type={show.current ? "text" : "password"}
                      placeholder="Enter current password"
                      {...field}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShow((p) => ({ ...p, current: !p.current }))}
                  >
                    {show.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* New Password */}
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <FormControl>
                    <Input
                      id="new-password"
                      type={show.new ? "text" : "password"}
                      placeholder="Enter new password"
                      {...field}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShow((p) => ({ ...p, new: !p.new }))}
                  >
                    {show.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <div className="relative">
                  <FormControl>
                    <Input
                      id="confirm-password"
                      type={show.confirm ? "text" : "password"}
                      placeholder="Confirm new password"
                      {...field}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShow((p) => ({ ...p, confirm: !p.confirm }))}
                  >
                    {show.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    );
  }
);

ChangePasswordForm.displayName = "ChangePasswordForm";

export default ChangePasswordForm;
