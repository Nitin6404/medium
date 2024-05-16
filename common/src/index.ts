import z from "zod";

export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().optional()
});

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});

export const createBlogInput = z.object({
    title: z.string(),
    content: z.string()
});

export const updateBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.string()
});

export type signupInput = z.infer<typeof signupInput>
export type signinInput = z.infer<typeof signinInput>
export type updateBlogInput = z.infer<typeof updateBlogInput>
export type createBlogInput = z.infer<typeof createBlogInput>