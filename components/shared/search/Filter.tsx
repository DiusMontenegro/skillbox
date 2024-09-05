"use client";
import React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Props {
    filters: {
        name: string;
        value: string;
    }[];
    otherClasses?: string;
    containerClasses?: string;
}

const Filter = ({ filters, otherClasses, containerClasses }: Props) => {
    return (
        <div className={`${containerClasses} relative`}>
            <Select>
                <SelectTrigger
                    className={`${otherClasses} border border-slate-900 px-5 py-2.5`}
                >
                    <div className="line-clamp-1 flex-1 text-start">
                        <SelectValue placeholder="Select a Filter" />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {filters.map(({ name, value }) => (
                            <SelectItem key={value} value={value}>
                                {name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};

export default Filter;
