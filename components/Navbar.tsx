import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
    return (
        <nav className="flex-between fixed z-50 w-full gap-5 bg-stone-200 p-6 sm:px-12">
            <Link href="/" className="flex items-center gap-1">
                <Image
                    src="/assets/images/logo.png"
                    alt="skillbox"
                    width={25}
                    height={25}
                />
                <p className="max-sm:hidden">
                    Skill<span>Box</span>.
                </p>
            </Link>
            {/* GlobalSearch */}
            <div className="flex-between gap-5">
                Switcher
                <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                        elements: {
                            avatarBox: "h-10 w-10",
                        },
                    }}
                />
                {/* MobileNav */}
            </div>
        </nav>
    );
};

export default Navbar;
