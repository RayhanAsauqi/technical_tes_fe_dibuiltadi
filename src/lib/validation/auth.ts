import z from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters",
  }),
  phone: z
    .string()
    .min(10, {
      message: "Phone number must be at least 10 characters",
    })
    .regex(/^[0-9]+$/, {
      message: "Phone number must contain only numbers",
    }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).+$/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
});

export const loginSchema = z.object({
  phone: z.string().min(10, {
    message: "Phone is required",
  }),
  password: z.string().min(2, {
    message: "Password is required",
  }),
});

export type LoginFormSchema = z.infer<typeof loginSchema>;
export type RegisterFormSchema = z.infer<typeof registerSchema>;
