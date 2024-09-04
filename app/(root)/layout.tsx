import Navbar from "@/components/shared/navbar/Navbar";
import LeftSidebar from "@/components/shared/sidebar/LeftSidebar";
import RightSidebar from "@/components/shared/sidebar/RightSidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="relative">
            <Navbar />
            <div className="flex">
                <LeftSidebar />
                <section className="flex min-h-screen flex-1 flex-col px-6 max-md:pb-14 sm:pb-14">
                    <div className="mx-auto w-full max-w-5xl">{children}</div>
                </section>
                <RightSidebar />
            </div>
            Toaster
        </main>
    );
};

export default Layout;
