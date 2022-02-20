import { Type } from "@sinclair/typebox";
import type { FastifyPluginAsync } from "fastify";
import { Todo, TodoSchema } from "../schema";

export const getTodos: FastifyPluginAsync = async (fastify) => {
  fastify.get<{ Reply: Todo[] }>(
    "/todos",
    {
      schema: {
        response: {
          200: Type.Array(TodoSchema),
        },
      },
    },
    (req, res) => {
      res.status(200).send([]);
    }
  );
};
