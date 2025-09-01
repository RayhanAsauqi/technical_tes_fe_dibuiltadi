import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useState } from "react";
import { Register } from "@/lib/api/auth-api";
import { alertError, alertSuccess } from "@/utils/alert";
import { ExtendedError } from "@/lib/extended-error";
import { registerSchema, type RegisterFormSchema } from "@/lib/validation/auth";

export default function RegisterForm() {
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      password: "",
    },
  });

  async function onSubmit(values: RegisterFormSchema) {
    setSubmitLoading(true);

    try {
      await Register({
        name: values.name,
        phone: values.phone,
        email: values.email,
        address: values.address,
        password: values.password,
      });
      alertSuccess("Registration successful! Please login.");
    } catch (error) {
      if (error instanceof ExtendedError) {
        if (error.isValidationError() && error.errors) {
          Object.entries(error.errors).forEach(([key, message]) => {
            form.setError(key as keyof RegisterFormSchema, {
              type: "server",
              message: String(message),
            });
          });
        } else {
          alertError(error.responseMessage);
        }
      } else {
        alertError("Registration failed. Please try again.");
      }
    } finally {
      setSubmitLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 md:space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your name"
                    className="h-9"
                    {...field}
                    disabled={submitLoading}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Phone</FormLabel>
                <FormControl>
                  <Input
                    placeholder="08234567891"
                    className="h-9"
                    {...field}
                    onChange={(e) => {
                      // Hanya allow numbers
                      const value = e.target.value.replace(/[^0-9]/g, "");
                      field.onChange(value);
                    }}
                    disabled={submitLoading}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="admin@example.com"
                    className="h-9"
                    {...field}
                    disabled={submitLoading}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your address"
                    className="h-9"
                    {...field}
                    disabled={submitLoading}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  className="h-9"
                  {...field}
                  disabled={submitLoading}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" className="w-full md:w-auto" disabled={submitLoading}>
            {submitLoading ? "Registering..." : "Register"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
