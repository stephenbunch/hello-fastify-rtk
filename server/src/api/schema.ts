import { Static, Type } from "@sinclair/typebox";

export const TodoDtoType = Type.Object(
  {
    id: Type.String(),
    description: Type.String(),
    completed: Type.Boolean(),
  },
  { $id: "TodoDto" }
);

export type TodoDto = Static<typeof TodoDtoType>;
