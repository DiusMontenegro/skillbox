"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { QuestionsSchema } from "@/lib/validations";
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

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
import { Badge } from "../ui/badge";
import { createQuestion } from "@/lib/actions/question.action";

interface Props {
    mongoUserId: string;
}

const Question = ({ mongoUserId }: Props) => {
    const tinyApiKey = process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY;
    const editorRef = useRef(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const formType: any = "create";

    function handleInputKeydown(
        e: React.KeyboardEvent<HTMLInputElement>,
        field: any
    ) {
        if (e.key === "Enter" && field.name === "tags") {
            e.preventDefault();

            const tagInput = e.target as HTMLInputElement;
            const tagValue = tagInput.value.trim();

            // If tagValue is not empty
            if (tagValue !== "") {
                // If tagValue.length is greater than 15, set Error message
                if (tagValue.length > 15) {
                    return form.setError("tags", {
                        type: "required",
                        message: "Tag must be less than 15 characters",
                    });
                }

                // If tag already exist in any fields Array, Append the vurrent value to the tags array and clear the tagInput value and also clear the errors in tag input.
                if (!field.value.includes(tagValue as never)) {
                    form.setValue("tags", [...field.value, tagValue]);
                    tagInput.value = "";
                    form.clearErrors("tags");
                }
            } else {
                form.trigger();
            }
        }
    }

    // filter. only accept the values that are not equal to the tag name
    function handleTagRemove(tag: string, field: any) {
        const newTags = field.value.filter((t: string) => t !== tag);

        form.setValue("tags", newTags);
    }

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
    async function onSubmit(values: z.infer<typeof QuestionsSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setIsSubmitting(true);

        try {
            // make an async call to API -> create a question
            // contain all form data

            await createQuestion({
                title: values.title,
                content: values.explanation,
                tags: values.tags,
                author: JSON.parse(mongoUserId),
                path: pathname,
            });

            // navigate to home page
            router.push("/");
        } catch (error) {
        } finally {
            setIsSubmitting(false);
        }
        // console.log(values);
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
                                    onBlur={field.onBlur} // save the value when exited
                                    onEditorChange={(content) =>
                                        field.onChange(content)
                                    }
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
                                {/* Form control only accpets one child you must wrap it in a react fragment */}
                                <>
                                    <Input
                                        className="no-focus min-h-[56px] border-2 border-gray-400"
                                        placeholder="Add tags..."
                                        onKeyDown={(e) =>
                                            handleInputKeydown(e, field)
                                        }
                                    />
                                    {field.value.length > 0 && (
                                        <div className="mt-2.5 flex gap-2.5">
                                            {field.value.map((tag: any) => (
                                                <Badge
                                                    className="flex items-center gap-1 font-light"
                                                    key={tag}
                                                    onClick={() =>
                                                        handleTagRemove(
                                                            tag,
                                                            field
                                                        )
                                                    }
                                                >
                                                    {tag.toUpperCase()}
                                                    <Image
                                                        src="/assets/icons/delete-tag.svg"
                                                        alt="Remove tag"
                                                        width={12}
                                                        height={12}
                                                        className="cursor-pointer object-contain invert"
                                                    />
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </>
                            </FormControl>
                            <FormDescription className="mt-2.5 text-sm text-gray-500">
                                Add up to 3 tags to describe what topic is your
                                question all about. You can also press
                                &quot;Enter&quot; to add tag.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    className="w-fit font-semibold"
                    disabled={isSubmitting}
                    type="submit"
                >
                    {isSubmitting ? (
                        <>{formType === "edit" ? "Editing..." : "Posting"}</>
                    ) : (
                        <>
                            {formType === "edit"
                                ? "Edit Question"
                                : "Ask a Question"}
                        </>
                    )}
                </Button>
            </form>
        </Form>
    );
};

export default Question;
