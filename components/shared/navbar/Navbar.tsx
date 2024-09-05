"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Theme from "./Theme";
import { useThemeStore } from "@/store";
import MobileNav from "./MobileNav";
import GlobalSearch from "../search/GlobalSearch";

const Navbar = () => {
    const { theme } = useThemeStore();

    return (
        <nav
            className={`flex-between fixed z-50 w-full gap-5 ${theme === "light" ? "bg-white" : "bg-slate-900 text-white"} p-6 sm:px-12`}
        >
            <Link href="/" className="flex items-center gap-1">
                <Image
                    src={
                        theme === "light"
                            ? `/assets/images/logo.png`
                            : "/assets/images/logo-light.svg"
                    }
                    alt="skillbox"
                    width={25}
                    height={25}
                />

                <p className="max-sm:hidden">
                    Skill<span>Box</span>.
                </p>
            </Link>

            <GlobalSearch />

            <div className="flex-between gap-5">
                <Theme />

                <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                        elements: {
                            avatarBox: "h-10 w-10",
                        },
                    }}
                />

                <MobileNav />
            </div>
        </nav>
    );
};

export default Navbar;
