import { Static, Type } from "@sinclair/typebox";

export * from "./todo/types";

export const ByIdParamsType = Type.Object({
  id: Type.String(),
});

export type ByIdParams = Static<typeof ByIdParamsType>;
