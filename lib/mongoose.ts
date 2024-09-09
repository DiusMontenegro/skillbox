import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
    // prevent unknown queries
    mongoose.set("strictQuery", true);

    // No MongoDB_URL
    if (!process.env.MONGODB_URL) return console.log("Missing MONGO_DB URL");

    // if MongoDB is connected
    if (isConnected) return console.log("MongoDB is connected");

    try {
        await mongoose.connect(process.env.MONGODB_URL, { dbName: "SkillBox" });
        isConnected = true;

        console.log("MongoDB DataBase is connected");
    } catch (error) {
        console.log(error);
    }
};
