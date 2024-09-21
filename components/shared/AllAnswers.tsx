import React from "react";
import Filter from "./search/Filter";
import { AnswerFilters } from "@/constants/filters";
import { getAllAnswers } from "@/lib/actions/answers.action";
import Link from "next/link";
import Image from "next/image";
import { getTimestamp } from "@/lib/utils";
import ParseHTML from "./ParseHTML";

interface AllAnswersProps {
    questionId: string;
    userId: string;
    totalAnswers: number;
    page?: number;
    filter?: string;
}

const AllAnswers = async ({ questionId, userId, totalAnswers, page, filter }: AllAnswersProps) => {
    const result = await getAllAnswers({ questionId: JSON.parse(questionId) });

    return (
        <div className="mt-11">
            <div className="flex items-center justify-between">
                <h3>{totalAnswers} Answers</h3>

                <Filter filters={AnswerFilters} />
            </div>

            <div>
                {result.answers.map((answer) => (
                    <article key={answer._id} className="border-b py-10">
                        <div className="flex items-center justify-between">
                            <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                                <Link
                                    href={`/profile/${answer.author.clerkId}`}
                                    className="flex flex-1 items-start gap-1 sm:items-center">
                                    <Image
                                        src={answer.author.picture}
                                        alt="profile"
                                        width={18}
                                        height={18}
                                        className="rounded-full object-cover max-sm:mt-0.5"
                                    />

                                    <div className="flex flex-col sm:flex-row sm:items-center">
                                        <p className="font-semibold">{answer.author.name}</p>
                                        <p className="ml-0.5 mt-0.5 line-clamp-1">
                                            <span className="max-sm:hidden"> - </span>
                                            answered {`${getTimestamp(answer.createdAt)}`}
                                        </p>
                                    </div>
                                </Link>

                                <div className="flex justify-end">Voting</div>
                            </div>
                        </div>

                        <ParseHTML data={answer.content} />
                    </article>
                ))}
            </div>
        </div>
    );
};

export default AllAnswers;
