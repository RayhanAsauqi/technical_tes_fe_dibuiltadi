import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFetch } from "@/hooks/use-fetch";
import { UpdateCustomer } from "@/lib/api/customer-api";
import { API_ENDPOINT } from "@/lib/constants/endpoint";
import type { CustomerPayload } from "@/lib/types/payload/customer";
import { customerEditSchema, type FormEditCustomerSchema } from "@/lib/validation/customer";
import { alertError } from "@/utils/alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useImperativeHandle, forwardRef, useEffect } from "react";
import { useForm } from "react-hook-form";

import type { CustomerDetailRes } from "@/lib/types/res/customer";

export type EditCustomerFormRef = {
  submitForm: () => void;
  isSubmitting: boolean;
};

type CustomerFormProps = {
  onSuccess?: () => void;
  code?: string;
};

const EditCustomerForm = forwardRef<EditCustomerFormRef, CustomerFormProps>(
  ({ onSuccess, code }, ref) => {
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);
    const { data: detailCustomer, loading } = useFetch<CustomerDetailRes>(
      `${API_ENDPOINT}/customers/${code}`
    );

    const form = useForm<FormEditCustomerSchema>({
      resolver: zodResolver(customerEditSchema),
      defaultValues: {
        name: "",
        identityNo: "",
        npwp: "",
        email: "",
        phone: "",
        mobile_phone: "",
        address: "",
      },
    });

    useEffect(() => {
      if (detailCustomer) {
        form.reset({
          name: detailCustomer.name ?? "",
          identityNo: detailCustomer.identityNo ?? "",
          npwp: detailCustomer.npwp ?? "",
          email: detailCustomer.email ?? "",
          phone: detailCustomer.phone ?? "",
          mobile_phone: detailCustomer.mobilePhone ?? "",
          address: detailCustomer.address ?? "",
        });
      }
    }, [detailCustomer, form]);

    async function onSubmit(values: FormEditCustomerSchema) {
      setSubmitLoading(true);
      try {
        if (!code) {
          throw new Error("Customer code is missing.");
        }
        await UpdateCustomer(code, values as CustomerPayload);
        onSuccess?.();
      } catch (error) {
        alertError(String(error), "bottom-right");
      } finally {
        setSubmitLoading(false);
      }
    }

    // expose submit function to parent via ref
    useImperativeHandle(ref, () => ({
      submitForm: () => form.handleSubmit(onSubmit)(),
      isSubmitting: submitLoading,
    }));

    return (
      <Form {...form}>
        {loading && (
          <div className="absolute top-0 left-0 w-full h-full bg-white/50 backdrop-blur-[1px] rounded-xl z-30"></div>
        )}
        <form className="space-y-3 md:space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="identityNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>No Identity</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your number identity" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="npwp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NPWP</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your NPWP" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="0812xxxxx" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mobile_phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile Phone</FormLabel>
                <FormControl>
                  <Input placeholder="0812xxxxx" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    );
  }
);

EditCustomerForm.displayName = "EditCustomerForm";

export default EditCustomerForm;
