import React from "react";
import Metric from "../shared/Metric";
import Link from "next/link";

import Tag from "../shared/sidebar/Tag";
import Image from "next/image";
import { getTimestamp } from "@/lib/utils";

interface QuestionProps {
    _id: number;
    title: string;
    tags: {
        _id: string;
        name: string;
    }[];
    author: {
        _id: string;
        name: string;
        picture: string;
    };
    upvotes: number;
    views: number;
    answers: Array<object>;
    createdAt: Date;
}

const QuestionCard = ({
    _id,
    title,
    tags,
    author,
    upvotes,
    views,
    answers,
    createdAt,
}: QuestionProps) => {
    const isAuthor = true;

    return (
        <div className="rounded-sm border border-black p-9 sm:px-11">
            <input type="hidden" value={_id} />
            <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
                <div>
                    <span className="line-clamp-1 flex text-xs sm:hidden">
                        {getTimestamp(createdAt)}
                    </span>
                    <Link href={`/question/${_id}`}>
                        <h3 className="line-clamp-1 flex-1 text-xl font-semibold">
                            {title}
                        </h3>
                    </Link>
                </div>
                {/* Add Edit / Delete Actions */}
            </div>
            <div className="mt-3.5 flex flex-wrap gap-2">
                {tags.map(({ name, _id }) => (
                    <Tag key={_id} _id={_id}>
                        {name}
                    </Tag>
                ))}
            </div>
            <div className="flex-between mt-6 w-full flex-wrap gap-3">
                <Link
                    href={`/profile/${author._id}`}
                    className="flex items-center justify-center gap-1"
                >
                    <Image
                        src={author.picture}
                        alt="User-Avatar"
                        width={12}
                        height={12}
                        className="rounded-full object-contain"
                    />

                    <p className="flex items-center gap-1">
                        {author.name}
                        <span
                            className={`line-clamp-1 text-xs ${isAuthor && "max-sm:hidden"}`}
                        >
                            • asked {getTimestamp(createdAt)}
                        </span>
                    </p>
                </Link>

                <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
                    <Metric
                        imgUrl="/assets/icons/like.svg"
                        alt="Upvotes"
                        value={upvotes}
                        title="Votes"
                    />

                    <Metric
                        imgUrl="/assets/icons/message.svg"
                        alt="Answers"
                        value={answers.length}
                        title="Answers"
                    />

                    <Metric
                        imgUrl="/assets/icons/eye.svg"
                        alt="Views"
                        value={views}
                        title="Views"
                    />
                </div>
            </div>
        </div>
    );
};

export default QuestionCard;
