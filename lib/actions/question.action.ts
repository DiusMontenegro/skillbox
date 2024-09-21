"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import Tag from "@/database/tag.model";
import { revalidatePath } from "next/cache";
import {
    CreateQuestionParams,
    GetQuestionByIdParams,
    GetQuestionParams,
} from "../../types/shared.types";
import User from "@/database/user.model";

// Get question by id
export async function getQuestionById(params: GetQuestionByIdParams) {
    try {
        connectToDatabase();

        const { questionId } = params;

        const question = await Question.findById(questionId)
            .populate({
                path: "tags",
                model: Tag,
                select: "_id name",
            })
            .populate({ path: "author", model: User, select: "_id clerkId name picture" });

        return question;
    } catch (error) {
        console.log("Error fetching the question: ", error);
        throw error;
    }
}

// Get all questions
export default async function getQuestions(params: GetQuestionParams) {
    try {
        connectToDatabase();

        // .populate is used to connect the tags: key to the tag model, same for author
        const questions = await Question.find({})
            .populate({
                path: "tags",
                model: Tag,
            })
            .populate({ path: "author", model: User })
            .sort({ createdAt: -1 });

        return { questions };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Create a question
export async function createQuestion(params: CreateQuestionParams) {
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

        revalidatePath(path);
    } catch (error) {}
}
