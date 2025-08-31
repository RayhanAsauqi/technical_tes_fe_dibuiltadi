import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../../ui/input";
import { useRef, useState } from "react";
import { Login } from "../../../lib/api/auth-api";
import { Button } from "../../ui/button";
import { alertError } from "../../../utils/alert";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import type { LoginPayload } from "@/lib/types/payload/auth";
import { ExtendedError } from "@/lib/extended-error";
import { loginSchema, type LoginFormSchema } from "@/lib/validation/auth";

export default function LoginForm() {
  const navigate = useNavigate();
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const formDataRef = useRef<LoginPayload>({
    phone: "",
    password: "",
  });

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormSchema) {
    formDataRef.current = values;
    setSubmitLoading(true);
    try {
      const data = await Login({
        phone: values.phone,
        password: values.password,
      });

      Cookies.set("accessToken", data.accessToken, {
        secure: true,
        sameSite: "Strict",
        expires: 1,
      });

      const { ...user } = data;
      Cookies.set("user", JSON.stringify(user), {
        secure: true,
        sameSite: "Strict",
        expires: 1,
      });

      navigate("/summary");
    } catch (error) {
      if (error instanceof ExtendedError) {
        if (error.isValidationError() && error.errors) {
          Object.entries(error.errors).forEach(([key, message]) => {
            form.setError(key as keyof LoginFormSchema, {
              type: "server",
              message: String(message),
            });
          });
        } else {
          alertError(error.responseMessage);
        }
      } else {
        alertError("Login failed. Please try again.");
      }
    } finally {
      setSubmitLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 md:space-y-4">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number Phone</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="0812xxxx"
                  {...field}
                  onChange={(e) => {
                    // Hanya allow numbers
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" className="w-full md:w-auto" disabled={submitLoading}>
            {submitLoading ? "Logging in..." : "Login"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
