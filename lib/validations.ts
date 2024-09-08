import { z } from "zod";

export const QuestionsSchema = z.object({
    title: z
        .string()
        .min(2, {
            message: "Question Title must contain at least 2 character(s)",
        })
        .max(30, {
            message: "Question Title must contain at most 30 character(s)",
        }),
    explanation: z.string().min(20, {
        message: "Explanation must contain at least 20 character(s)",
    }),
    tags: z
        .array(
            z
                .string()
                .min(1, {
                    message: "Tag name must contain at least 1 character(s)",
                })
                .max(15, {
                    message: "Tag must contain at most 30 character(s)",
                })
        )
        .min(1)
        .max(3, { message: "Tag must contain at most 3 elements(s)" }),
});
