import React from "react";
import { useSession, signIn } from "next-auth/react";

export default function Header() {
    const { data: session, status } = useSession();
    return (
        <div className="flex justify-between px-4 sm:px-2">
            <div></div>
            <div>
                {session ? (
                    <button className="text-xl  hover:underline underline-offset-2  ">
                        Write
                    </button>
                ) : (
                    <button
                        className="text-xl  hover:underline underline-offset-2 "
                        onClick={() => signIn()}
                    >
                        Login
                    </button>
                )}
            </div>
        </div>
    );
}
