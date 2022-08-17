import { createRouter } from "./context";
import { createProtectedRouter } from "./protected-router";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const postRouter = createRouter()
    .query("getAll", {
        async resolve({ ctx }) {
            try {
                return await ctx.prisma.post.findMany({
                    include: {
                        author: {
                            select: {
                                name: true,
                            },
                        },
                    },
                });
            } catch (error) {
                console.log("error", error);
            }
        },
    })
    .middleware(({ ctx, next }) => {
        if (!ctx.session || !ctx.session.user) {
            throw new TRPCError({ code: "UNAUTHORIZED" });
        }
        return next({
            ctx: {
                ...ctx,
                // infers that `session` is non-nullable to downstream resolvers
                session: { ...ctx.session, user: ctx.session.user },
            },
        });
    })
    .mutation("createPost", {
        input: z.object({
            title: z.string(),
            description: z.string(),
            content: z.string(),
        }),
        async resolve({ ctx, input }) {
            try {
                return await ctx.prisma.post.create({
                    data: {
                        title: input.title,
                        description: input.description,
                        content: input.content,
                        userId: ctx.session.user.id,
                    },
                });
            } catch (error) {
                console.log(error);
            }
        },
    });
