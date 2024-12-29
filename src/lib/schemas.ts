import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const providerSchema = z.object({
  name: z.string(),
  onClick: z.function().args().returns(z.void()),
});

export const providersSchema = z.array(providerSchema);

export type LoginFormData = z.infer<typeof loginFormSchema>;
export type Provider = z.infer<typeof providerSchema>;
