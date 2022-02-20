import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import cuid from "cuid";

@Entity({ tableName: "todo" })
export class TodoEntity {
  @PrimaryKey()
  id: string = cuid();

  @Property()
  description: string;

  @Property({ default: false })
  completed: boolean;

  constructor(values: { description: string; completed?: boolean }) {
    this.description = values.description;
    this.completed = values.completed ?? false;
  }
}
