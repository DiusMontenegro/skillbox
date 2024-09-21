import type { Metadata } from "next";
import React from "react";
// eslint-disable-next-line camelcase
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import "../styles/prism.css";
import Provider from "@/components/providers/Provider";

const inter = Inter({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-spaceGrotesk",
});

export const metadata: Metadata = {
    title: "SkillBox",
    description:
        "Discover our vibrant, community-driven platform for programming questions and answers. Connect with developers worldwide, seeking help, sharing expertise, and collaborating. Explore key topics in web development, mobile app development, data structures, algorithms, and beyond. Enhance your coding skills, gain insights, and find innovative solutions in an engaging and supportive environment. Join today!",
    icons: {
        icon: "/assets/images/site-logo.svg",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
                <Provider>{children}</Provider>
            </body>
        </html>
    );
}
