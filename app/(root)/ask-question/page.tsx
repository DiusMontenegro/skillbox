import Question from "@/components/forms/Question";
import { getUserById } from "@/lib/actions/user.action";
// import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
    // const { userId } = auth(); // real clerk userId data
    const userId = "clerk12345"; // prepopulated data

    if (!userId) redirect("/sign-in");

    const mongoUser = await getUserById({ userId });

    return (
        <div className="mt-36">
            <h1 className="text-2xl font-bold">Ask a question</h1>

            <div className="mt-9">
                <Question mongoUserId={JSON.stringify(mongoUser._id)} />
            </div>
        </div>
    );
};

export default Page;
