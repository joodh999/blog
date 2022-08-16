import React from "react";
import { format } from "date-fns";

interface props {
    title: string | null;
    description?: string | null;
    createdAt: Date | null;
    author: {
        name: string | null;
    } | null;
}

export const Card: React.FC<props> = ({
    author,
    createdAt,
    title,
    description,
}) => {
    const date = format(createdAt as Date, "LLL dd, yyyy");

    return (
        <div className="my-5 p-4 text-left hover:bg-zinc-800 rounded-lg  ">
            <h1 className="text-xl font-semibold sm:text-2xl text-emerald-300 hover:underline ">
                <b>#</b> {title}
            </h1>
            <p className="text-md py-2 text-zinc-300">{description}</p>
            <div className="flex text-sm font-light  text-zinc-100">
                <p className="">{author?.name}</p>
                <span className="mx-2">/</span>
                <p>{date}</p>
            </div>
        </div>
    );
};

export default Card;
