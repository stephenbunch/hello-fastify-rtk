import { Static, Type } from "@sinclair/typebox";
import type { FastifyPluginAsync } from "fastify";
import { TodoEntity } from "../../entities/TodoEntity";
import { StatusCodes } from "http-status-codes";
import type { FilterQuery } from "@mikro-orm/core";
import {
  Todo,
  TodoFilter,
  TodoFilterType,
  TodoType,
  UpdateTodoInput,
  UpdateTodoInputType,
} from "./types";

export const updateTodos: FastifyPluginAsync = async (fastify) => {
  fastify.route<{
    Querystring: TodoFilter;
    Body: UpdateTodoInput;
    Reply: Todo[];
  }>({
    method: "PATCH",
    url: "/todos",

    schema: {
      querystring: TodoFilterType,
      body: UpdateTodoInputType,
      response: {
        [StatusCodes.OK]: Type.Array(TodoType),
      },
    },

    async handler(request) {
      const repo = request.em.getRepository(TodoEntity);
      const where: FilterQuery<TodoEntity> = {};
      if (request.query.completed !== undefined) {
        where.completed = request.query.completed;
      }

      await repo.nativeUpdate(where, request.body);

      return await repo.find(where);
    },
  });
};
