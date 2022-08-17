import React from "react";
import Layout from "../components/Layout";
import { trpc } from "../utils/trpc";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";

type Inputs = {
    title: string;
    description: string;
    content: string;
};

const Write = () => {
    const router = useRouter();
    const mutation = trpc.useMutation(["post.createPost"]);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        mutation.mutate({
            title: data.title,
            description: data.description,
            content: data.content,
        });
    };

    if (mutation.isSuccess) {
        alert("Posted");
        router.push("/");
    }

    if (mutation.error) {
        return (
            <Layout>
                <h1 className="text-2xl text-red-600 ">
                    Error : {mutation.error.message}
                </h1>
                <Link href="/">
                    <a className="pt-9 p-3 underline ">Return to HomePage</a>
                </Link>
            </Layout>
        );
    }
    return (
        <Layout>
            <h1 className="text-left text-2xl font-bold text-emerald-300">
                Create Post
            </h1>
            <div>
                <form
                    action=""
                    className="mt-6 text-left"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div>
                        <label htmlFor="" className="text-xl ">
                            Title
                        </label>

                        <input
                            {...register("title", {
                                required: true,
                            })}
                            type="text"
                            className="border-2 border-neutral-900 w-full    text-zinc-200 border-b-zinc-400 text-2xl bg-neutral-900 focus:outline-none m-3"
                        />
                    </div>
                    <br />

                    <div>
                        <label htmlFor="" className="text-xl">
                            Description
                        </label>
                        <textarea
                            {...register("description", { required: true })}
                            id=""
                            cols={30}
                            rows={2}
                            className="border-2 border-neutral-900 overflow-hidden w-full text-zinc-200 border-b-zinc-400 text-xl bg-neutral-900 focus:outline-none  m-3"
                        />
                    </div>
                    <div className="py-4">
                        <label htmlFor="" className="text-xl">
                            Content
                        </label>
                        <textarea
                            {...register("content", { required: true })}
                            id=""
                            cols={30}
                            rows={6}
                            className="border-2 border-zinc-400 p-1 rounded-md overflow-hidden w-full text-zinc-200 text-xl bg-neutral-900 focus:outline-none  m-3"
                        />
                    </div>
                    <div className="flex justify-between">
                        <input
                            type="submit"
                            className="text-xl border border-zinc-300 rounded-md p-2"
                        />
                        <p className="text-red-400 p-2 text-lg">
                            Status:{mutation.status}
                        </p>
                    </div>
                </form>
            </div>
        </Layout>
    );
};
export default Write;
