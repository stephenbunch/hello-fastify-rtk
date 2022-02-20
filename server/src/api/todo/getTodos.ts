import { Type } from "@sinclair/typebox";
import type { FastifyPluginAsync } from "fastify";
import { TodoDto, TodoDtoType } from "../schema";

export const getTodos: FastifyPluginAsync = async (fastify) => {
  fastify.get<{ Reply: TodoDto[] }>(
    "/todos",
    {
      schema: {
        response: {
          200: Type.Array(TodoDtoType),
        },
      },
    },
    (req, res) => {
      res.status(200).send([]);
    }
  );
};
