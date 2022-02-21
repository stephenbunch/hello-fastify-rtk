import { Type } from "@sinclair/typebox";
import type { FastifyPluginAsync } from "fastify";
import { TodoEntity } from "../../entities/TodoEntity";
import { StatusCodes } from "http-status-codes";
import type { FilterQuery } from "@mikro-orm/core";
import { TodoFilter, TodoFilterType } from "./types";

export const deleteTodos: FastifyPluginAsync = async (fastify) => {
  fastify.route<{
    Querystring: TodoFilter;
    Reply: number;
  }>({
    method: "DELETE",
    url: "/todos",

    schema: {
      querystring: TodoFilterType,
      response: {
        [StatusCodes.OK]: Type.Number(),
      },
    },

    async handler(request) {
      const repo = request.em.getRepository(TodoEntity);
      const where: FilterQuery<TodoEntity> = {};
      if (request.query.completed !== undefined) {
        where.completed = request.query.completed;
      }
      return await repo.nativeDelete(where);
    },
  });
};
