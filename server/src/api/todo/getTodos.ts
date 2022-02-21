import { Type } from "@sinclair/typebox";
import type { FastifyPluginAsync } from "fastify";
import { TodoEntity } from "../../entities/TodoEntity";
import { StatusCodes } from "http-status-codes";
import { Todo, TodoType } from "./types";
import { QueryOrder } from "@mikro-orm/core";

export const getTodos: FastifyPluginAsync = async (fastify) => {
  fastify.route<{ Reply: Todo[] }>({
    method: "GET",
    url: "/todos",

    schema: {
      response: {
        [StatusCodes.OK]: Type.Array(TodoType),
      },
    },

    async handler(request) {
      const repo = request.em.getRepository(TodoEntity);
      return await repo.findAll({ orderBy: { id: QueryOrder.ASC } });
    },
  });
};
