import { z } from "zod";

export const customerSchema = z.object({
  name: z.string().min(1, "Customer name is required"),
  identityNo: z.string().optional(),
  npwp: z.string().optional(),
  email: z.string().email("Invalid email format").optional(),
  phone: z.string().optional(),
  mobile_phone: z.string().optional(),
  provinceCode: z.string().min(1, "Province code is required"),
  cityCode: z.string().min(1, "City code is required"),
  address: z.string().min(1, "Address is required"),
  companyType: z.enum(["person", "company"]),
});

export type FormCustomerSchema = z.infer<typeof customerSchema>;