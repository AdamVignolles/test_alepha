import { $page } from "alepha/react/router";
import { $client } from "alepha/server/links";

import type { HelloController } from "../api/controllers/HelloController.ts";
import type { PostController } from "../api/controllers/PostController.ts";

export class AppRouter {
  api = $client<HelloController>();
  postsApi = $client<PostController>();

  home = $page({
    path: "/",
    lazy: () => import("./components/Home.tsx"),
    loader: () => this.api.hello(),
  });

  helloPage = $page({
    path: "/hello",
    lazy: () => import("./components/Hello.tsx"),
    loader: () => this.api.hello(),
  });

  postsPage = $page({
    path: "/posts",
    lazy: () => import("./components/Posts.tsx"),
    loader: async () => ({ posts: await this.postsApi.listPosts() }),
  });
}
