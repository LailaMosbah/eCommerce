import { z } from "zod";

const signupSchema = z
  .object({
    firstName: z.string().min(1, {
      message: "First name is required",
    }),
    lastName: z.string().min(1, {
      message: "Last name is required",
    }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, {
        message: "Password must be at least 6 characters long",
      })
      .regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/, {
        message:
          "Password must contain at least one uppercase letter and one special character",
      }),
    confirmPassword: z.string().min(1, {
      message: "Confirm password is required",
    }),
  })
  .refine((input) => input.password === input.confirmPassword, {
    message: "Password and confirm password do not match",
    path: ["confirmPassword"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

export { signupSchema, type SignupFormValues };
