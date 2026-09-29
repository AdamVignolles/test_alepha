import { z } from "alepha";
import { $entity, db } from "alepha/orm";

export const messageEntity = $entity({
  name: "messages",
  schema: z.object({
    id: db.primaryKey(),
    content: z.text(),
    createdAt: db.createdAt(),
  }),
});
