import { getStore } from "@netlify/blobs";
import { handle } from "../lib/rooms.mjs";

export default async (req) => {
  const blobs = getStore({ name: "design-jeopardy", consistency: "strong" });
  const store = {
    get: key => blobs.get(key, { type: "json" }),
    set: (key, value) => blobs.setJSON(key, value)
  };
  return handle(req, store);
};

export const config = { path: "/api/*" };
