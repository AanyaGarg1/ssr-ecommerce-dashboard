import { z } from "zod";

export const productSchema = z.object({
    name: z.string().min(1, "Name is required").max(60, "Name is too long"),
    description: z.string().min(1, "Description is required"),
    price: z.coerce.number().min(0, "Price must be positive"),
    stock: z.coerce.number().int().min(0, "Stock must be a positive integer"),
    category: z.string().min(1, "Category is required"),
    images: z.array(z.string()).optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;
