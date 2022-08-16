import { createRouter } from "./context";

export const postRouter = createRouter().query("getAll", {
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
});
