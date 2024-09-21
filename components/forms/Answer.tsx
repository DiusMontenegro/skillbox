"use client";

import { AnswerSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import Image from "next/image";
import { Editor } from "@tinymce/tinymce-react";
import { createAnswer } from "@/lib/actions/answers.action";
import { usePathname } from "next/navigation";

interface AnswerProps {
    question: string;
    questionId: string;
    authorId: string;
}

const Answer = ({ question, questionId, authorId }: AnswerProps) => {
    const tinyApiKey = process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY;
    const pathname = usePathname();
    const editorRef = useRef(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof AnswerSchema>>({
        resolver: zodResolver(AnswerSchema),
        defaultValues: {
            answer: "",
        },
    });

    async function handleCreateAnswer(values: z.infer<typeof AnswerSchema>) {
        console.log("hello");
        try {
            setIsSubmitting(true);

            await createAnswer({
                content: values.answer,
                author: JSON.parse(authorId),
                question: JSON.parse(questionId),
                path: pathname,
            });

            form.reset();

            if (editorRef.current) {
                const editor = editorRef.current as any;

                editor.setContent("");
            }
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="mt-8">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                <h4 className="text-lg font-semibold">Write your answer here</h4>

                <Button
                    className="gap-1.5 rounded-md px-4 py-2.5 shadow-none"
                    variant="outline"
                    size="sm"
                    onClick={() => {}}>
                    <Image
                        src="/assets/icons/stars.svg"
                        alt="star"
                        className="object-contain"
                        width={12}
                        height={12}
                    />
                    Generate an AI answer
                </Button>
            </div>

            <Form {...form}>
                <form
                    className="mt-6 flex w-full flex-col gap-10"
                    onSubmit={form.handleSubmit(handleCreateAnswer)}>
                    <FormField
                        control={form.control}
                        name="answer"
                        render={({ field }) => (
                            <FormItem className="flex w-full flex-col gap-3">
                                <FormControl className="mt-3.5">
                                    <Editor
                                        onBlur={field.onBlur} // save the value when exited
                                        onEditorChange={(content) => field.onChange(content)}
                                        apiKey={tinyApiKey}
                                        onInit={(_evt, editor) => {
                                            // @ts-ignore
                                            editorRef.current = editor;
                                        }}
                                        init={{
                                            height: 350, // size
                                            menubar: false, // if you'd like a menubar
                                            plugins: [
                                                "advlist",
                                                "autolink",
                                                "lists",
                                                "link",
                                                "image",
                                                "charmap",
                                                "preview",
                                                "anchor",
                                                "searchreplace",
                                                "visualblocks",
                                                "fullscreen",
                                                "insertdatetime",
                                                "media",
                                                "table",
                                                "codesample",
                                            ],
                                            toolbar:
                                                "undo redo | blocks | " +
                                                "codesample | bold italic forecolor | alignleft aligncenter " +
                                                "alignright alignjustify | bullist numlist | " +
                                                "removeformat | help",
                                            content_style:
                                                "body { font-family:Inter; font-size:16px }",
                                            skin: "oxide-dark",
                                            content_css: "dark",
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="mt-10 flex justify-end">
                        <Button type="submit" className="w-fit" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default Answer;
