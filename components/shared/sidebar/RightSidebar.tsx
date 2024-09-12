import Image from "next/image";
import Link from "next/link";
import React from "react";
import Tag from "./Tag";

const testQuestions = [
    "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
    "Is it only me or the font is bolder than necessary?",
    "Redux Toolkit Not Updating State as Expected",
    "Async/Await Function Not Handling Errors Properly",
    "Can I get the course for free?",
];

const testTags = [
    { _id: "1", name: "NEXTJS", count: 32 },
    { _id: "2", name: "TEST", count: 19 },
    { _id: "3", name: "REACT", count: 18 },
    { _id: "4", name: "CSS", count: 13 },
    { _id: "5", name: "NEXTJS", count: 9 },
];

const RightSidebar = () => {
    return (
        <aside className="custom-scrollbar sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l p-6 pt-36 max-xl:hidden">
            <div>
                <h3 className="text-xl font-bold">Top Questions</h3>
                <div className="mt-7 flex w-full flex-col gap-[30px]">
                    {testQuestions.map((item, index) => (
                        <Link
                            className="flex cursor-pointer items-center justify-between gap-7"
                            key={index}
                            href="/"
                        >
                            <p className="text-sm font-light">{item}</p>
                            <Image
                                src="/assets/icons/chevron-right.svg"
                                alt="right"
                                width={20}
                                height={20}
                            />
                        </Link>
                    ))}
                </div>
            </div>

            <div className="mt-16">
                <h3 className="text-xl font-bold">Popular Tags</h3>
                <div className="mt-7 flex flex-col gap-4">
                    {testTags.map((tag) => (
                        <div
                            className="flex w-full items-center justify-between"
                            key={tag._id}
                        >
                            <Tag _id={tag._id}>{tag.name}</Tag>

                            <span>{tag.count}</span>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default RightSidebar;
