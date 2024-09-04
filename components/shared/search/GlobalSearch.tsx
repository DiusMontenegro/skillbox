import Image from "next/image";
import React from "react";
import { Input } from "@/components/ui/input";

function GlobalSearch() {
    return (
        <div className="relative w-full max-w-[600px] max-lg:hidden">
            <div className="relative flex min-h-[56px] grow items-center gap-2 rounded-xl px-4">
                <Image
                    src="/assets/icons/search.svg"
                    alt="Search"
                    width={22}
                    height={22}
                    className="cursor-pointer"
                />
                <Input
                    type="text"
                    className="no-focus rounded-sm border-gray-600 bg-transparent"
                    placeholder="Search anything globally..."
                />
            </div>
        </div>
    );
}

export default GlobalSearch;
