import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { signIn, useSession } from "next-auth/react";
import Layout from "../components/Layout";
import Card from "../components/Card";

const Home: NextPage = () => {
    const { data, isLoading } = trpc.useQuery(["post.getAll"]);
    if (isLoading) {
        return (
            <Layout>
                <div className="animate-pulse h-screen text-2xl text-center py-16">
                    Fetching Posts...
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <h1 className="text-left text-2xl font-bold text-emerald-300">
                Recent Posts
            </h1>
            {data?.map((post) => {
                return <Card key={post.id} {...post} />;
            })}
        </Layout>
    );
};

export default Home;
