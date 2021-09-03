import { setupServer } from "msw/node";
import { handlers } from "./handlers";

console.log("SETTING UP SERVER");
console.log(handlers);
export const server = setupServer(...handlers);
