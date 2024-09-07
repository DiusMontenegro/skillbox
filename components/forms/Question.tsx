"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { QuestionsSchema } from "@/lib/validations";
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

const Question = () => {
    const tinyApiKey = process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY;
    const editorRef = useRef(null);

    // 1. Define your form.
    const form = useForm<z.infer<typeof QuestionsSchema>>({
        resolver: zodResolver(QuestionsSchema),
        defaultValues: {
            title: "",
            explanation: "",
            tags: [],
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof QuestionsSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex w-full flex-col gap-10"
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className="flex w-full flex-col">
                            <FormLabel className="text-base font-semibold">
                                Question Title{" "}
                                <span className="text-xs text-red-600">*</span>
                            </FormLabel>
                            <FormControl className="mt-3.5">
                                <Input
                                    className="no-focus min-h-[56px] border-2 border-gray-400"
                                    autoFocus
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription className="mt-2.5 text-sm text-gray-500">
                                Be specific for your question, make it
                                informative.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="explanation"
                    render={({ field }) => (
                        <FormItem className="flex w-full flex-col gap-3">
                            <FormLabel className="text-base font-semibold">
                                Detailed explanation of your question
                                <span className="text-xs text-red-600">*</span>
                            </FormLabel>
                            <FormControl className="mt-3.5">
                                <Editor
                                    apiKey={tinyApiKey}
                                    onInit={(_evt, editor) => {
                                        // @ts-ignore
                                        editorRef.current = editor;
                                    }}
                                    initialValue=""
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
                                    }}
                                />
                            </FormControl>
                            <FormDescription className="mt-2.5 text-sm text-gray-500">
                                Introduce the problem and waht did you do so
                                far. Minimum of 20 characters.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem className="flex w-full flex-col">
                            <FormLabel className="text-base font-semibold">
                                Tags
                                <span className="text-xs text-red-600">*</span>
                            </FormLabel>
                            <FormControl className="mt-3.5">
                                <Input
                                    className="no-focus min-h-[56px] border-2 border-gray-400"
                                    placeholder="Add tags..."
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription className="mt-2.5 text-sm text-gray-500">
                                Add up to 3 tags to describe what topic is your
                                question all about. You can also press
                                &quot;enter&quot; to add tag.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
};

export default Question;
