import { z } from "alepha";
import { $repository } from "alepha/orm";
import { $action } from "alepha/server";

import { postEntity } from "../entities/postEntity.ts";

export class PostController {
  posts = $repository(postEntity);

  listPosts = $action({
    path: "/posts", // -> GET /api/posts
    schema: {
      response: z.array(postEntity.schema),
    },
    handler: () =>
      this.posts.findMany({
        orderBy: { column: "createdAt", direction: "desc" },
      }),
  });

  createPost = $action({
    method: "POST",
    path: "/posts", // -> POST /api/posts
    schema: {
      body: z.object({
        title: z.text(),
        content: z.text(),
      }),
      response: postEntity.schema,
    },
    handler: ({ body }) => this.posts.create(body),
  });

  deletePost = $action({
    method: "DELETE",
    path: "/posts/:id", // -> DELETE /api/posts/:id
    schema: {
      params: z.object({
        id: z.text(),
      }),
      response: z.object({
        success: z.boolean(),
      }),
    },
    handler: async ({ params }) => {
      await this.posts.deleteById(params.id);
      return { success: true };
    },
  });
}
