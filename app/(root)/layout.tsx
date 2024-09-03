import Navbar from "@/components/Navbar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="relative">
            <Navbar />
            <div className="flex">
                Left Sidebar
                <section className="flex min-h-screen flex-1 flex-col px-6 max-md:pb-14 sm:pb-14">
                    <div className="mx-auto w-full max-w-5xl">{children}</div>
                </section>
                Right Sidebar
            </div>
            Toaster
        </main>
    );
};

export default Layout;
