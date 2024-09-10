import Link from "next/link";
import React from "react";
import getQuestions from "@/lib/actions/question.action";
import { HomePageFilters } from "@/constants/filters";

import HomeFilters from "@/components/Home/HomeFilters";
import Filter from "@/components/shared/search/Filter";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { Button } from "@/components/ui/button";
import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";

export default async function Home() {
    const result = await getQuestions({});
    const { questions } = result;

    return (
        <>
            <div className="mx-auto flex w-full max-w-5xl flex-col-reverse justify-between gap-4 pt-36 sm:flex-row sm:items-center">
                <h1 className="text-xl font-bold">All Questions</h1>

                <Link
                    className="flex justify-end max-sm:w-full"
                    href="/ask-question"
                >
                    <Button className=" border-slate-900 ">Ask Question</Button>
                </Link>
            </div>

            <div
                className={`mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center md:flex-col`}
            >
                <LocalSearch
                    route="/"
                    iconPosition="left"
                    imgSrc="/assets/icons/search.svg"
                    placeholder="Search questions"
                    otherClasses=""
                />

                <Filter
                    filters={HomePageFilters}
                    otherClasses="min-h-[56px] sm:min-w-[180px]"
                    containerClasses="flex md:hidden"
                />
            </div>

            <div>
                <HomeFilters />
            </div>

            <div className="mt-10 flex w-full flex-col gap-6">
                {questions.length > 0 ? (
                    questions.map((question) => {
                        const {
                            _id,
                            title,
                            tags,
                            author,
                            answers,
                            upvotes,
                            views,
                            createdAt,
                        } = question;

                        return (
                            <QuestionCard
                                key={_id}
                                _id={_id}
                                title={title}
                                tags={tags}
                                author={author}
                                upvotes={upvotes}
                                views={views}
                                createdAt={createdAt}
                                answers={answers}
                            />
                        );
                    })
                ) : (
                    <NoResult
                        title="There's no question to show"
                        link="/ask-question"
                        linkTitle="Ask a Question"
                        description="Be the first to break the silence! 🚀 Ask a Question and
                Kickstart the discussion. Our query could be the next thing
                others learn from. Get involved! 💡"
                    />
                )}
            </div>
        </>
    );
}
