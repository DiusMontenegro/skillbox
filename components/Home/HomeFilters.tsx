"use client";
import React from "react";
import { HomePageFilters } from "@/constants/filters";

import { Button } from "../ui/button";

const HomeFilters = () => {
    const active = "newest";

    return (
        <div className="mt-10 hidden flex-wrap gap-3 md:flex ">
            {HomePageFilters.map(({ name, value }) => (
                <Button
                    className={`border-slate-900 px-6 py-3 capitalize hover:bg-slate-900 hover:text-white hover:opacity-90 ${active === value && "bg-slate-900 text-white"}`}
                    key={value}
                    type="button"
                    variant={"outline"}
                    onClick={() => {}}
                >
                    {name}
                </Button>
            ))}
        </div>
    );
};

export default HomeFilters;
