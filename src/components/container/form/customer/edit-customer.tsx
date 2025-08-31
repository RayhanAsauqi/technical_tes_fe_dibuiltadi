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
import { CreateCustomer, UpdateCustomer } from "@/lib/api/customer-api";
import { API_ENDPOINT } from "@/lib/constants/endpoint";
import type { CustomerPayload } from "@/lib/types/payload/customer";
import type { CitiesRes } from "@/lib/types/res/cities";
import type { ProvinceRes } from "@/lib/types/res/province";
import { customerSchema, type FormCustomerSchema } from "@/lib/validation/customer";
import { alertError } from "@/utils/alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useImperativeHandle, forwardRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { AutoComplete } from "@/components/ui/auto-complete";
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
    const { data: provinces } = useFetch<ProvinceRes>(`${API_ENDPOINT}/provinces/list`);
    const { data: cities } = useFetch<CitiesRes>(`${API_ENDPOINT}/cities/list`);
    const { data: detailCustomer } = useFetch<CustomerDetailRes>(
      `${API_ENDPOINT}/customers/${code}`
    );

    const form = useForm<FormCustomerSchema>({
      resolver: zodResolver(customerSchema),
      defaultValues: {
        name: "",
        identityNo: "",
        npwp: "",
        email: "",
        phone: "",
        mobile_phone: "",
        provinceCode: "",
        cityCode: "",
        address: "",
        companyType: "person",
      },
    });

    // Set default value jika edit
    useEffect(() => {
      if (detailCustomer) {
        form.reset({
          name: detailCustomer.name ?? "",
          identityNo: detailCustomer.identityNo ?? "",
          npwp: detailCustomer.npwp ?? "",
          email: detailCustomer.email ?? "",
          phone: detailCustomer.phone ?? "",
          mobile_phone: detailCustomer.mobilePhone ?? "",
          provinceCode: detailCustomer.province.code ?? "",
          cityCode: detailCustomer.city.code ?? "",
          address: detailCustomer.address ?? "",
          companyType: detailCustomer.companyType ?? "person",
        });
      }
    }, [detailCustomer, form]);

    async function onSubmit(values: FormCustomerSchema) {
      setSubmitLoading(true);
      try {
        if (code) {
          await UpdateCustomer(code, values as CustomerPayload);
        } else {
          await CreateCustomer(values as CustomerPayload);
        }
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
            name="provinceCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Province</FormLabel>
                <FormControl>
                  <AutoComplete
                    options={
                      provinces?.items
                        ? provinces.items.map((province) => ({
                            label: province.name,
                            value: province.code,
                          }))
                        : []
                    }
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder="Select province..."
                    searchPlaceholder="Search province..."
                    emptyMessage="No province found."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cityCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <AutoComplete
                    options={
                      cities?.items
                        ? cities.items.map((city) => ({
                            label: city.name,
                            value: city.code,
                          }))
                        : []
                    }
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder="Select city..."
                    searchPlaceholder="Search city..."
                    emptyMessage="No city found."
                  />
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
          <FormField
            control={form.control}
            name="companyType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select type..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="person">Person</SelectItem>
                      <SelectItem value="company">Company</SelectItem>
                    </SelectContent>
                  </Select>
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
// ...existing code...
