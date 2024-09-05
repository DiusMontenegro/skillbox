import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

interface Props {
    title: string;
    description: string;
    link: string;
    linkTitle: string;
}

const NoResult = ({ title, description, link, linkTitle }: Props) => {
    return (
        <div className="mt-10 flex w-full flex-col items-center justify-center">
            <Image
                src="/assets/images/no-results.svg"
                alt="No Results"
                width={150}
                height={150}
                className="block object-contain"
            />

            <h2 className="mt-8 text-center text-xl font-semibold">{title}</h2>

            <p className="my-3.5 max-w-md text-center text-sm">{description}</p>

            <Link href={link}>
                <Button size="sm" className="mt-5 rounded">
                    {linkTitle}
                </Button>
            </Link>
        </div>
    );
};

export default NoResult;
