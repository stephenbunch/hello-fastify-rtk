import { Type } from "@sinclair/typebox";
import type { FastifyPluginAsync } from "fastify";
import { TodoEntity } from "../../entities/TodoEntity";
import { CreateTodoDto, CreateTodoDtoType } from "../dto/CreateTodoDto";
import { TodoDto, TodoDtoType } from "../dto/TodoDto";
import { StatusCodes } from "http-status-codes";

export const createTodo: FastifyPluginAsync = async (fastify) => {
  fastify.route<{ Body: CreateTodoDto; Reply: TodoDto }>({
    method: "POST",
    url: "/todos",

    schema: {
      body: CreateTodoDtoType,
      response: {
        [StatusCodes.CREATED]: Type.Array(TodoDtoType),
      },
    },

    async handler(req, res) {
      const todo = new TodoEntity(req.body);

      const repo = req.em.getRepository(TodoEntity);
      await repo.persistAndFlush(todo);

      res.status(StatusCodes.CREATED).send(todo);
    },
  });
};
