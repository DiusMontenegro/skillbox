"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import Tag from "@/database/tag.model";

export async function createQuestion(params: any) {
    // eslint-disable-next-line no-empty
    try {
        connectToDatabase();

        const { title, content, tags, author, path } = params; // object.name should match the schema

        // Create Question
        const question = await Question.create({
            title,
            content,
            author,
        });

        const tagDocuments = [];

        // create tags or get them if they already exist
        // findOneAndUpdate: 3 params ,name:Regex, 'i' case insensitive, updateFn and options
        // many to many relationship tag >--< question

        for (const tag of tags) {
            const existingTag = await Tag.findOneAndUpdate(
                { name: { $regex: new RegExp(`^${tag}$`, "i") } },
                {
                    $setOnInsert: {
                        name: tag,
                    },
                    $push: { questions: question._id },
                },
                { upsert: true, new: true }
            );

            tagDocuments.push(existingTag);
        }

        await Question.findByIdAndUpdate(question._id, {
            $push: { tags: { $each: tagDocuments } },
        });

        // Create an interaction record for the user's ask-question action

        // increment author's reputation by +5 for creating a question
    } catch (error) {}
}
