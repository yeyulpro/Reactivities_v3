import * as z from "zod";


export const registerSchema = z.object({ 
  displayName: z.string().min(6,"displayName is required."),
  email: z.email(),
    password: z.string().min(8,"Password is required."),
});

export type RegisterSchema = z.infer<typeof registerSchema>;


 