import React from "react";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
    const { data: session, status } = useSession();

    const router = useRouter();

    return (
        <div className="flex justify-between px-4 sm:px-2">
            <div></div>
            <div>
                {session ? (
                    <Link href={router.pathname === "/" ? "/Write" : "/"}>
                        <button className="text-xl  hover:underline underline-offset-2  ">
                            {router.pathname === "/" ? "Write" : "Explore"}
                        </button>
                    </Link>
                ) : (
                    <button
                        className="text-xl  hover:underline underline-offset-2 "
                        onClick={() => signIn("discord")}
                    >
                        Login
                    </button>
                )}
            </div>
        </div>
    );
}
