import Answer from "@/components/forms/Answer";
import AllAnswers from "@/components/shared/AllAnswers";
import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import Tag from "@/components/shared/sidebar/Tag";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { getTimestamp } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = async ({ params, searchParams }) => {
    const result = await getQuestionById({ questionId: params.id });
    const { userId: clerkId } = auth();

    let mongoUser;

    if (clerkId) {
        mongoUser = await getUserById({ userId: clerkId });
    }

    return (
        <div className="mt-32">
            <div className="flex-start w-full flex-col">
                <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                    <Link
                        className="flex items-center justify-start gap-1"
                        href={`/profile/${result.author.clerkId}`}>
                        <Image
                            className="rounded-full"
                            src={result.author.picture}
                            alt={result.author.className}
                            width={22}
                            height={22}
                        />

                        <p className="font-semibold">{result.author.name}</p>
                    </Link>

                    <div className="flex justify-end">Voting</div>
                </div>

                <h2 className="mt-3.5 w-full text-left text-xl font-semibold">{result.title}</h2>
            </div>

            <div className="mb-8 mt-5 flex flex-wrap gap-4">
                <Metric
                    imgUrl="/assets/icons/clock.svg"
                    alt="clock-icon"
                    value={` Asked ${getTimestamp(result.createdAt)}`}
                    title=""
                />

                <Metric
                    imgUrl="/assets/icons/message.svg"
                    alt="Answers"
                    value={result.answers.length}
                    title="Answers"
                />

                <Metric
                    imgUrl="/assets/icons/eye.svg"
                    alt="Views"
                    value={result.views}
                    title="Views"
                />
            </div>

            <ParseHTML data={result.content} />

            <div className="mt-8 flex flex-wrap gap-2">
                {result.tags.map((tag: any) => (
                    <Tag key={tag._id} _id={tag._id}>
                        {tag.name}
                    </Tag>
                ))}
            </div>

            <AllAnswers
                questionId={JSON.stringify(result._id)}
                userId={JSON.stringify(mongoUser._id)}
                totalAnswers={result.answers.length}
            />

            <Answer
                question={result.content}
                questionId={JSON.stringify(result._id)}
                authorId={JSON.stringify(mongoUser._id)}
            />
        </div>
    );
};

export default Page;
