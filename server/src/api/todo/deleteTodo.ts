import type { FastifyPluginAsync } from "fastify";
import { TodoEntity } from "../../entities/TodoEntity";
import { StatusCodes } from "http-status-codes";
import { ByIdParams, ByIdParamsType } from "../types";

export const deleteTodo: FastifyPluginAsync = async (fastify) => {
  fastify.route<{
    Params: ByIdParams;
  }>({
    method: "DELETE",
    url: "/todos/:id",

    schema: {
      params: ByIdParamsType,
    },

    async handler(request, reply) {
      const repo = request.em.getRepository(TodoEntity);

      await repo.nativeDelete({ id: request.params.id });

      reply.status(StatusCodes.OK).send();
    },
  });
};
