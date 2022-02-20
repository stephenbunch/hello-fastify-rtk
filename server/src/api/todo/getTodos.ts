import { Type } from "@sinclair/typebox";
import type { FastifyPluginAsync } from "fastify";
import { TodoEntity } from "../../entities/TodoEntity";
import { TodoDto, TodoDtoType } from "../dto/TodoDto";
import { StatusCodes } from "http-status-codes";

export const getTodos: FastifyPluginAsync = async (fastify) => {
  fastify.route<{ Reply: TodoDto[] }>({
    method: "GET",
    url: "/todos",

    schema: {
      response: {
        [StatusCodes.OK]: Type.Array(TodoDtoType),
      },
    },

    async handler(req, res) {
      const repo = req.em.getRepository(TodoEntity);
      const todos = await repo.findAll();

      res.status(StatusCodes.OK).send(todos);
    },
  });
};
