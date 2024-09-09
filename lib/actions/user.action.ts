"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";

// Get User By Id
export async function getUserById(params: any) {
    try {
        connectToDatabase();

        const { userId } = params;

        const user = await User.findOne({ clerkId: userId }); // find user by clerkId

        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
