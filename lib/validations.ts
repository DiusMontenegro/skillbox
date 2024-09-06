import { z } from "zod";

export const QuestionsSchema = z.object({
    title: z.string().min(2, { message: "custom message" }).max(8),
    explanation: z.string().min(20),
    tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});
