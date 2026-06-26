"use strict";

import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { dirname, extname, join, normalize, sep } from "node:path";
import { fileURLToPath } from "node:url";

const host = "0.0.0.0";
const port = Number.parseInt(process.env.PORT || process.argv[2] || "5173", 10);
const root = join(dirname(fileURLToPath(import.meta.url)), "docs");
const safeRoot = root.endsWith(sep) ? root : `${root}${sep}`;

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".svg": "image/svg+xml",
};

function send(response, statusCode, body, contentType = "text/plain; charset=utf-8") {
  response.writeHead(statusCode, {
    "Cache-Control": "no-store",
    "Content-Type": contentType,
    "X-Content-Type-Options": "nosniff",
  });
  response.end(body);
}

const server = createServer(async (request, response) => {
  try {
    const requestUrl = new URL(request.url, `http://${request.headers.host}`);
    const pathname = requestUrl.pathname === "/" ? "/index.html" : requestUrl.pathname;
    const filePath = normalize(join(root, decodeURIComponent(pathname)));

    if (filePath !== root && !filePath.startsWith(safeRoot)) {
      send(response, 403, "Forbidden");
      return;
    }

    const extension = extname(filePath);
    const body = await readFile(filePath);
    send(response, 200, body, contentTypes[extension] || "application/octet-stream");
  } catch (error) {
    if (error.code === "ENOENT") {
      send(response, 404, "Not found. Run npm run build if docs/ is missing.");
      return;
    }

    send(response, 500, "Server error");
  }
});

server.listen(port, host, () => {
  console.log(`Ritual Agent Deploy running at http://127.0.0.1:${port}`);
});
