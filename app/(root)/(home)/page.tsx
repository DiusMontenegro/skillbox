"use client";
import React from "react";
import HomeFilters from "@/components/Home/HomeFilters";
import Filter from "@/components/shared/search/Filter";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { HomePageFilters } from "@/constants/filters";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
    const pathname = usePathname();

    return (
        <>
            <div className="mx-auto flex w-full max-w-5xl flex-col-reverse justify-between gap-4 pt-36 sm:flex-row sm:items-center">
                <h1 className="text-xl font-bold">All Questions</h1>

                <Link className="flex justify-end max-sm:w-full" href="/">
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
        </>
    );
}
