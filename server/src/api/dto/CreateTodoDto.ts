import { Static, Type } from "@sinclair/typebox";

export const CreateTodoDtoType = Type.Object({
  description: Type.String(),
  completed: Type.Optional(Type.Boolean()),
});

export type CreateTodoDto = Static<typeof CreateTodoDtoType>;
