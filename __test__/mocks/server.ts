import { setupServer } from "msw/node";
import { handlers } from "./handlers";

console.log("SETTING UP SERVER");
export const server = setupServer(...handlers);
