import Question from "@/components/forms/Question";
import React from "react";

const Page = () => {
    return (
        <div className="mt-36">
            <h1 className="text-2xl font-bold">Ask a question</h1>

            <div className="mt-9">
                <Question />
            </div>
        </div>
    );
};

export default Page;
