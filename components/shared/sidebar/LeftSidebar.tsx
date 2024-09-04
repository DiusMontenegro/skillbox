"use client";
import React from "react";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const SidebarContent = () => {
    const pathname = usePathname();

    return (
        <div className="flex flex-1 flex-col gap-6">
            {sidebarLinks.map(({ route, imgURL, label }) => {
                const isActive =
                    (pathname.includes(route) && route.length > 1) ||
                    pathname === route;
                return (
                    <Link
                        key={route}
                        href={route}
                        className={`${isActive && "rounded-lg border border-blue-800 text-blue-800"} flex items-center gap-4 p-4`}
                    >
                        <Image
                            src={imgURL}
                            alt={label}
                            width={18}
                            height={18}
                            className={`${!isActive && "opacity-60"}`}
                        />
                        <p
                            className={`${isActive && "font-extrabold"} max-lg:hidden`}
                        >
                            {label}
                        </p>
                    </Link>
                );
            })}
        </div>
    );
};

const LeftSidebar = () => (
    <aside className="custom-scrollbar sticky left-0 top-0 h-screen w-fit flex-col overflow-y-auto border-r border-gray-200 p-6 pt-36 shadow-md max-sm:hidden lg:w-[266px]">
        <SidebarContent />
    </aside>
);

export default LeftSidebar;
