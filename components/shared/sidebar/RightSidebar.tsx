import Image from "next/image";
import Link from "next/link";
import React from "react";

const testQuestions = [
    "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
    "Is it only me or the font is bolder than necessary?",
    "Redux Toolkit Not Updating State as Expected",
    "Async/Await Function Not Handling Errors Properly",
    "Can I get the course for free?",
];

const testTags = [
    { tag: "NEXTJS", count: 32 },
    { tag: "TEST", count: 19 },
    { tag: "REACT", count: 18 },
    { tag: "CSS", count: 13 },
    { tag: "NEXTJS", count: 9 },
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
                    {testTags.map(({ tag, count }, index) => (
                        <Link
                            key={index}
                            className="flex justify-between gap-2"
                            href="/"
                        >
                            <div className="inline-flex items-center rounded-md border border-none border-transparent bg-slate-900 px-4 py-2 text-[10px] font-semibold uppercase text-white shadow hover:bg-slate-900/80 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
                                {tag}
                            </div>
                            <p className="pt-1 text-sm">{count}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default RightSidebar;
