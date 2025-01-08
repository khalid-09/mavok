import { z } from "zod";

export const newsletterSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  receiveUpdates: z.boolean().optional(),
});

export type NewsletterSchema = z.infer<typeof newsletterSchema>;
