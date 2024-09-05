"use client";
import Link from "next/link";
import React from "react";
import HomeFilters from "@/components/Home/HomeFilters";
import Filter from "@/components/shared/search/Filter";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { HomePageFilters } from "@/constants/filters";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";

const questions = [
    {
        _id: 1,
        title: "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
        tags: [
            { _id: "1", name: "python" },
            { _id: "2", name: "sql" },
        ],
        author: {
            _id: "123",
            name: "Dius Montenegro",
            picture: "/assets/icons/user.svg",
        },
        upvotes: 10,
        views: 100,
        answers: [{ _id: "1", author: "Zeus" }],
        createdAt: new Date("2023-09-05T12:00:00Z"),
    },
    {
        _id: 2,
        title: "Redux Toolkit Not Updating State as Expected",
        tags: [
            { _id: "1", name: "react.js" },
            { _id: "2", name: "redux" },
        ],
        author: {
            _id: "124",
            name: "Rea Revilleza",
            picture: "/assets/icons/user.svg",
        },
        upvotes: 1582,
        views: 127,
        answers: [{ _id: "1", author: "Xyrah" }],
        createdAt: new Date("2023-06-05T12:00:00Z"),
    },
];

export default function Home() {
    const pathname = usePathname();

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
                className={`${pathname === "/" && "md:flex-col"} mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center`}
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
