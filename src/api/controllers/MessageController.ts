import { z } from "alepha";
import { $repository } from "alepha/orm";
import { $action } from "alepha/server";

import { messageEntity } from "../entities/messageEntity.ts";

export class MessageController {
  messages = $repository(messageEntity);

  listMessages = $action({
    path: "/messages", // -> GET /api/messages
    schema: {
      response: z.array(messageEntity.schema),
    },
    handler: () => this.messages.findMany(),
  });

  createMessage = $action({
    method: "POST",
    path: "/messages", // -> POST /api/messages
    schema: {
      body: z.object({ content: z.text() }),
      response: messageEntity.schema,
    },
    handler: ({ body }) => this.messages.create(body),
  });
}
