import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from 'hono/cors'
import { creatMRF } from "./controllers/createMRF.js";
import { listMRF } from "./controllers/listMRF.js";

const app = new Hono();

app.use('*', cors());
app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// TODO(enhancement): Add swagger for the APIs
app.get('/api/mrf', listMRF);
app.post('/api/mrf', creatMRF);

serve({ fetch: app.fetch, port: 8080 });
console.log("Server is running on http://localhost:8080");
