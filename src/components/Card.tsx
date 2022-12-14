import React from "react";
import { format } from "date-fns";
import Link from "next/link";

interface props {
    title: string | null;
    description?: string | null;
    createdAt: Date | null;
    author: {
        name: string | null;
    } | null;
    slug: string;
}

export const Card: React.FC<props> = ({
    author,
    createdAt,
    title,
    description,
    slug,
}) => {
    const date = format(createdAt as Date, "LLL dd, yyyy");

    return (
        <Link href={`/p/${slug}`}>
            <a href="">
                <div className="mt-7  text-left hover:bg-zinc-800 rounded-lg  p-4">
                    <h1 className="text-xl font-semibold sm:text-2xl  hover:underline ">
                        <b>#</b> {title}
                    </h1>
                    <p className="text-md py-2 text-zinc-300 ">{description}</p>
                    <div className="flex text-sm font-light  text-zinc-100">
                        <p className="">{author?.name}</p>
                        <span className="mx-2">/</span>
                        <p>{date}</p>
                    </div>
                </div>
            </a>
        </Link>
    );
};

export default Card;
