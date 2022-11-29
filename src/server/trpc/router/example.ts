import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const exampleRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
  test: publicProcedure
    // using zod schema to validate and infer input values
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(({ input }) => {
        // Here some login stuff would happen
        return {
          user: {
            name: input.name,
            role: 'ADMIN'
          },
        };
       })
});
