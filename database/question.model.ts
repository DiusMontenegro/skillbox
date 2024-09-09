import { Schema, models, model, Document } from "mongoose";

export interface IQuestion extends Document {
    title: string;
    content: string;
    tags: Schema.Types.ObjectId[]; // referencing a connection to another model in the Database
    views: number;
    upvotes: Schema.Types.ObjectId[];
    downvotes: Schema.Types.ObjectId[];
    author: Schema.Types.ObjectId; // for only 1 data/object but connected to another schema
    answers: Schema.Types.ObjectId[];
    createdAt: Date;
}

const QuestionSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }], // ref: reference to a tag model
    views: { type: Number, default: 0 }, // if type is number has a default value, specify. Else 0.
    upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    author: { type: Schema.Types.ObjectId, ref: "User" },
    answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
    createdAt: { type: Date, default: Date.now },
});

const Question = models.Question || model("Question", QuestionSchema); // If model doesn't exist, create a model

export default Question;
