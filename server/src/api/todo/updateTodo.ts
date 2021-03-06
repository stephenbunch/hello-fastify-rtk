import type { FastifyPluginAsync } from "fastify";
import { TodoEntity } from "../../entities/TodoEntity";
import { StatusCodes } from "http-status-codes";
import {
  Todo,
  TodoType,
  UpdateTodoValues,
  UpdateTodoValuesType,
} from "./types";
import { ByIdParams, ByIdParamsType } from "../types";

export const updateTodo: FastifyPluginAsync = async (fastify) => {
  fastify.route<{
    Params: ByIdParams;
    Body: UpdateTodoValues;
    Reply: Todo;
  }>({
    method: "PATCH",
    url: "/todos/:id",

    schema: {
      params: ByIdParamsType,
      body: UpdateTodoValuesType,
      response: {
        [StatusCodes.OK]: TodoType,
      },
    },

    async handler(request, reply) {
      const repo = request.em.getRepository(TodoEntity);
      const todo = await repo.findOne({ id: request.params.id });

      if (!todo) {
        reply.callNotFound();
        return;
      }

      repo.assign(todo, request.body);
      await repo.persistAndFlush(todo);

      return todo;
    },
  });
};
