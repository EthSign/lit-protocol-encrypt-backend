import { z } from "zod";

export const litSchema = z.object({
  body: z.object({
    message: z.string({
      required_error: "message is required"
    })
  })
});

export const litParams = z.object({
  userId: z.string()
});

export type LitParamsInput = z.TypeOf<typeof litParams>;
export type LitInput = z.TypeOf<typeof litSchema>["body"];
