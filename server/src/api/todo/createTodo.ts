import { Type } from "@sinclair/typebox";
import type { FastifyPluginAsync } from "fastify";
import { TodoEntity } from "../../entities/TodoEntity";
import { StatusCodes } from "http-status-codes";
import {
  CreateTodoValues,
  CreateTodoValuesType,
  Todo,
  TodoType,
} from "./types";

export const createTodo: FastifyPluginAsync = async (fastify) => {
  fastify.route<{ Body: CreateTodoValues; Reply: Todo }>({
    method: "POST",
    url: "/todos",

    schema: {
      body: CreateTodoValuesType,
      response: {
        [StatusCodes.CREATED]: Type.Array(TodoType),
      },
    },

    async handler(request, reply) {
      const todo = new TodoEntity(request.body);

      const repo = request.em.getRepository(TodoEntity);
      await repo.persistAndFlush(todo);

      reply.status(StatusCodes.CREATED).send(todo);
    },
  });
};
