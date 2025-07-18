import { z } from "zod/v3";



const requiredString=(fieldname:string)=>{return z.string().min(1,`${fieldname} is required`)};

export const activitySchema = z.object({
  title: requiredString('title'),
  description: requiredString('description'),
  category: requiredString('category'),
  date: z.coerce.date({message:"Date is required..."}),
  location:z.object({
    venue: requiredString('venue'),
     city: z.string().optional(),
     latitude:z.coerce.number(),
     longitude:z.coerce.number(),

  }),
 
 
});

export type ActivitySchemaType = z.infer<typeof activitySchema>;
