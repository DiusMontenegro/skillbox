"use client";
import React from "react";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

function NavContent() {
    const pathname = usePathname();

    return (
        <section className="flex h-full flex-col gap-6 pt-10">
            {sidebarLinks.map((item) => {
                const isActive =
                    (pathname.includes(item.route) && item.route.length > 1) ||
                    pathname === item.route;

                return (
                    <SheetClose asChild key={item.route}>
                        <Link
                            href={item.route}
                            className={`flex items-center gap-2 bg-transparent p-2 ${isActive && "rounded-lg border border-blue-800 text-blue-800"}`}
                        >
                            <Image
                                src={item.imgURL}
                                alt={item.label}
                                width={18}
                                height={18}
                                className={`${!isActive && "opacity-60"}`}
                            />
                            <p className={`${isActive && "font-extrabold"}`}>
                                {item.label}
                            </p>
                        </Link>
                    </SheetClose>
                );
            })}
        </section>
    );
}

function MobileNav() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Image
                    src="/assets/icons/hamburger.svg"
                    alt="menu"
                    width={24}
                    height={24}
                    className="sm:hidden"
                />
            </SheetTrigger>
            <SheetContent side="left" className="border-none">
                <SheetHeader>
                    <SheetTitle className="flex-center pt-6 text-xl">
                        <Image
                            src="/assets/images/logo.png"
                            alt="Skillbox"
                            width={24}
                            height={24}
                        />
                        SkillBox.
                    </SheetTitle>
                </SheetHeader>
                <NavContent />
            </SheetContent>
        </Sheet>
    );
}

export default MobileNav;
