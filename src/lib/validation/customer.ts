import { z } from "zod";

export const customerSchema = z.object({
  name: z.string().min(1, "Customer name is required"),
  identityNo: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 8, {
      message: "Identity number must be at least 8 characters",
    }),

  npwp: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 15, {
      message: "NPWP must be at least 15 characters",
    }),
  email: z.string().email("Invalid email format").optional(),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9]{10,13}$/.test(val), "Phone number must be 10-13 digits"),
  mobile_phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[0-9]{10,13}$/.test(val),
      "Mobile phone number must be 10-13 digits"
    ),
  provinceCode: z.string().min(1, "Province code is required"),
  cityCode: z.string().min(1, "City code is required"),
  address: z
    .string()
    .min(1, "Address is required")
    .refine((val) => val.length > 4, {
      message: "Address must be more than 4 characters",
    }),
  companyType: z.enum(["person", "company"]),
});

export const customerEditSchema = z.object({
  name: z.string().min(1, "Customer name is required"),
  identityNo: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 8, {
      message: "Identity number must be at least 8 characters",
    }),
  npwp: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 15, {
      message: "NPWP must be at least 15 characters",
    }),
  email: z.string().email("Invalid email format").optional(),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9]{10,13}$/.test(val), "Phone number must be 10-13 digits"),
  mobile_phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[0-9]{10,13}$/.test(val),
      "Mobile phone number must be 10-13 digits"
    ),
  address: z
    .string()
    .min(1, "Address is required")
    .refine((val) => val.length > 4, {
      message: "Address must be more than 4 characters",
    }),
});

export type FormCustomerSchema = z.infer<typeof customerSchema>;
export type FormEditCustomerSchema = z.infer<typeof customerEditSchema>;
