import { Static, Type } from "@sinclair/typebox";

export const TodoType = Type.Object({
  id: Type.String(),
  description: Type.String(),
  completed: Type.Boolean(),
});

export const CreateTodoInputType = Type.Intersect([
  Type.Pick(Type.Partial(TodoType), ["completed"]),
  Type.Omit(TodoType, ["id", "completed"]),
]);

export const UpdateTodoInputType = Type.Partial(Type.Omit(TodoType, ["id"]));

export const TodoFilterType = Type.Object({
  completed: Type.Optional(Type.Boolean()),
});

export type Todo = Static<typeof TodoType>;

export type CreateTodoInput = Static<typeof CreateTodoInputType>;

export type UpdateTodoInput = Static<typeof UpdateTodoInputType>;

export type TodoFilter = Static<typeof TodoFilterType>;
