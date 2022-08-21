import React from "react";
import type { NextPage, GetServerSideProps } from "next";
import { prisma } from "../../server/db/client";
import slugify from "slugify";
import { format } from "date-fns";
import Layout from "../../components/Layout";

type props = {
    title: string | null;
    description?: string | null;
    createdAt: string;
    author: {
        name: string | null;
    } | null;
    slug: string;
    content: string;
};

const Post: NextPage<props> = (post) => {
    console.log(post.title);
    return (
        <Layout>
            <div className="text-left pt-4">
                <h1 className="text-3xl ">{post.title}</h1>
                <p className="text-sm py-2 text-zinc-300">{post.description}</p>
                <div className="flex text-sm font-light  text-zinc-100">
                    <p className="">{post.author?.name}</p>
                    <span className="mx-2">/</span>
                    <p>{post.createdAt}</p>
                </div>
                <div className="text-xl pt-7">{post.content}</div>
            </div>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const Post = await prisma.post.findFirst({
        where: {
            slug: context.params?.Post as string,
        },
        include: {
            author: {
                select: {
                    name: true,
                },
            },
        },
    });

    if (!Post) {
        return {
            notFound: true,
        };
    }

    const { createdAt, ...post } = Post;
    const date = format(createdAt as Date, "LLL dd, yyyy");

    return {
        props: { ...post, createdAt: date },
    };
};

export default Post;
