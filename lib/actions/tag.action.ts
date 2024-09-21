"use server";

import { GetAllTagsParams, GetTopInteractedTagsParams } from "@/types/shared.types";
import { connectToDatabase } from "../mongoose";
import User from "@/database/user.model";
import Tag from "@/database/tag.model";

export async function getAllTags(params: GetAllTagsParams) {
    try {
        connectToDatabase();

        const tags = await Tag.find({});

        return { tags };
    } catch (error) {
        console.log(error);
    }
}

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
    try {
        connectToDatabase();

        // const { userId, limit = 3 } = params;
        const { userId } = params;

        const user = await User.findById(userId);

        if (!user) throw new Error("user not found");

        return [
            { _id: "1", name: "nextJs" },
            { _id: "2", name: "typescript" },
            { _id: "3", name: "reactJs" },
        ];
    } catch (error) {
        console.log(error);
    }
}
