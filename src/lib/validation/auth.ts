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
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

export const loginSchema = z.object({
  phone: z.string().min(2, {
    message: "Username must be at least 2 characters",
  }),
  password: z.string().min(2),
});

export type LoginFormSchema = z.infer<typeof loginSchema>;
export type RegisterFormSchema = z.infer<typeof registerSchema>;
