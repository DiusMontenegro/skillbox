import React from "react";
import { ClerkProvider } from "@clerk/nextjs";

const Provider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <ClerkProvider
            appearance={{
                elements: {
                    formButtonPrimary: "primary-gradient",
                    footerActionLink:
                        "primary-text-gradient hover:text-primary-500",
                },
            }}
        >
            {children}
        </ClerkProvider>
    );
};

export default Provider;
