import { z } from "alepha";
import type { Infer } from "alepha";
import { useClient } from "alepha/react";
import { useForm } from "alepha/react/form";
import { useRouter } from "alepha/react/router";

import type { PostController } from "../../api/controllers/PostController.ts";
import { postEntity } from "../../api/entities/postEntity.ts";

export interface PostsProps {
  posts: Infer<typeof postEntity.schema>[];
}

const postFormSchema = z.object({
  title: z.text(),
  content: z.text(),
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

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-bold">Posts</h1>

      <form {...form.props} className="mt-4 flex flex-col gap-3">
        <input
          {...form.input.title.props}
          placeholder="Title"
          className="rounded border px-3 py-2"
        />
        <input
          {...form.input.content.props}
          placeholder="Content"
          className="rounded border px-3 py-2"
        />
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Create
        </button>
      </form>

      <ul className="mt-6 flex flex-col gap-4">
        {posts.map((post) => (
          <li key={post.id} className="rounded border p-4">
            <h2 className="font-semibold">{post.title}</h2>
            <p className="text-gray-600">{post.content}</p>
            <p className="mt-1 text-xs text-gray-400">{post.createdAt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
