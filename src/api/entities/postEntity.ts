import { z } from "alepha";
import { $entity, db } from "alepha/orm";

export const postEntity = $entity({
  name: "posts",
  schema: z.object({
    id: db.primaryKey(),
    title: z.text(),
    content: z.text(),
    createdAt: db.createdAt(),
  }),
});
