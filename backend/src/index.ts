import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from 'hono/cors'
import { creatMRF } from "./controllers/createMRF.js";

const app = new Hono();

app.use('*', cors());
app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post('/api/mrf', creatMRF)

serve({ fetch: app.fetch, port: 8080 });
console.log("Server is running on http://localhost:8080");
