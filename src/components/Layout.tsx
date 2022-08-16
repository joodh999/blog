import React, { ReactNode } from "react";
import Header from "./Header";
import { useSession } from "next-auth/react";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <div className="animate-pulse h-screen text-3xl text-center py-16">
                Loading...
            </div>
        );
    }

    return (
        <div className="mx-auto text-center max-w-lg mt-4">
            <Header />
            <main className="mt-2">{children}</main>
        </div>
    );
};

export default Layout;
