import { serveDir } from "https://deno.land/std@0.207.0/http/file_server.ts";

Deno.serve((req: Request) => {
  return serveDir(req, {
    fsRoot: "build",
    enableCors: true, // Required so that preview iframes can access fonts (for katex).
  });
});
