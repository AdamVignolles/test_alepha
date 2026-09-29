import { $module } from "alepha";

import { HelloController } from "./controllers/HelloController.ts";
import { MessageController } from "./controllers/MessageController.ts";

export const ApiModule = $module({
  name: "test.api",
  services: [HelloController, MessageController],
});
