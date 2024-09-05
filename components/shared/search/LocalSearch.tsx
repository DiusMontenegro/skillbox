"use client";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import React from "react";

interface CustomInputProps {
    route: string;
    iconPosition: string;
    imgSrc: string;
    placeholder: string;
    otherClasses?: string;
}

const LocalSearch = ({
    route,
    iconPosition,
    imgSrc,
    placeholder,
    otherClasses,
}: CustomInputProps) => {
    return (
        <div
            className={`${iconPosition === "right" && "flex-row-reverse"} ${otherClasses} flex min-h-[56px] w-full grow items-center gap-2 rounded border border-slate-900 px-4`}
        >
            <Image
                src={imgSrc}
                alt="Search Icon"
                width={22}
                height={22}
                className="cursor-pointer"
            />
            <Input
                type="text"
                className="no-focus rounded-sm border-gray-600 bg-transparent"
                placeholder={placeholder}
                value=""
                onChange={() => {}}
            />
        </div>
    );
};

export default LocalSearch;
