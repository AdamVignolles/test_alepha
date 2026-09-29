import { z } from "alepha";
import type { Infer } from "alepha";
import { useAction, useClient } from "alepha/react";
import { useForm } from "alepha/react/form";
import { useRouter } from "alepha/react/router";

import type { PostController } from "../../api/controllers/PostController.ts";
import { postEntity } from "../../api/entities/postEntity.ts";
import NavBar from "./NavBar.tsx";

export interface PostsProps {
  posts: Infer<typeof postEntity.schema>[];
}

const postFormSchema = z.object({
  title: z.text(),
  content: z.text(),
});

const formatDate = (value: string) =>
  new Date(value).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

const Posts = ({ posts }: PostsProps) => {
  const router = useRouter();
  const api = useClient<PostController>();

  const form = useForm({
    schema: postFormSchema,
    handler: async (values) => {
      await api.createPost({ body: values });
      form.reset();
      await router.reload();
    },
  });

  const deletePost = useAction<[string]>(
    {
      handler: async (id, _ctx) => {
        await api.deletePost({ params: { id } });
        await router.reload();
      },
    },
    [],
  );

  return (
    <>
      <NavBar />
      <div className="mx-auto max-w-2xl p-6">
        <h1 className="font-bold text-3xl">Posts</h1>
        <p className="mt-1 text-gray-500">
          A tiny CRUD example backed by the database.
        </p>

        <form
          {...form.props}
          className="mt-6 flex flex-col gap-3 rounded-lg border bg-gray-50 p-4"
        >
          <input
            {...form.input.title.props}
            placeholder="Title"
            className="rounded border px-3 py-2 outline-none focus:border-blue-500"
          />
          <input
            {...form.input.content.props}
            placeholder="Content"
            className="rounded border px-3 py-2 outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="self-start rounded bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add post
          </button>
        </form>

        <ul className="mt-6 flex flex-col gap-3">
          {posts.length === 0 && (
            <li className="rounded border border-dashed p-4 text-center text-gray-400">
              No posts yet. Add your first one above.
            </li>
          )}
          {posts.map((post) => (
            <li
              key={post.id}
              className="flex items-start justify-between gap-4 rounded-lg border p-4 shadow-sm"
            >
              <div>
                <h2 className="font-semibold text-lg">{post.title}</h2>
                <p className="mt-1 text-gray-600">{post.content}</p>
                <p className="mt-2 text-gray-400 text-xs">
                  {formatDate(post.createdAt)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => deletePost.run(post.id)}
                disabled={deletePost.loading}
                className="shrink-0 rounded border border-red-200 px-3 py-1 text-red-600 text-sm transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Posts;
