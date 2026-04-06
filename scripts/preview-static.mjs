import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function parseArgs(argv) {
  const args = { port: 4173, dir: "out" };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--port" || arg === "-p") args.port = Number(argv[++i]);
    else if (arg === "--dir" || arg === "-d") args.dir = argv[++i];
  }
  return args;
}

const { port, dir } = parseArgs(process.argv.slice(2));
const rootDir = path.resolve(__dirname, "..", dir);

const MIME_BY_EXT = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".map": "application/json; charset=utf-8",
};

function cacheControlForPath(urlPath, ext) {
  if (urlPath.startsWith("/_next/static/")) {
    return "public, max-age=31536000, immutable";
  }
  if (ext === ".html" || ext === "") {
    // "F5" revalida a página (ETag/304) sem baixar assets tudo de novo.
    return "no-cache";
  }
  // Conservative default: keep revalidation for other assets too.
  return "no-cache";
}

function safeJoin(root, requestPath) {
  const decoded = decodeURIComponent(requestPath);
  const normalized = path.normalize(decoded).replace(/^(\.\.(\/|\\|$))+/, "");
  return path.join(root, normalized);
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function serveFile(req, res, filePath, urlPath) {
  const stat = await fs.stat(filePath);
  if (!stat.isFile()) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_BY_EXT[ext] ?? "application/octet-stream";
  const etag = `W/"${stat.size}-${Math.trunc(stat.mtimeMs)}"`;
  const cacheControl = cacheControlForPath(urlPath, ext);

  res.setHeader("Content-Type", contentType);
  res.setHeader("Cache-Control", cacheControl);
  res.setHeader("ETag", etag);
  res.setHeader("Last-Modified", stat.mtime.toUTCString());

  if (req.headers["if-none-match"] === etag) {
    res.writeHead(304);
    res.end();
    return;
  }

  const data = await fs.readFile(filePath);
  res.writeHead(200);
  res.end(data);
}

async function serve404(req, res) {
  const candidates = [
    path.join(rootDir, "404.html"),
    path.join(rootDir, "404", "index.html"),
  ];
  for (const candidate of candidates) {
    if (await fileExists(candidate)) {
      await serveFile(req, res, candidate, "/404.html");
      return;
    }
  }
  res.writeHead(404);
  res.end("Not found");
}

const server = http.createServer(async (req, res) => {
  try {
    const requestUrl = new URL(req.url ?? "/", "http://localhost");
    let urlPath = requestUrl.pathname;

    // Redirect /about -> /about/ when a folder exists (trailingSlash: true).
    if (!urlPath.endsWith("/") && path.extname(urlPath) === "") {
      const asDir = safeJoin(rootDir, urlPath + "/");
      if (await fileExists(asDir)) {
        res.writeHead(308, { Location: urlPath + "/" });
        res.end();
        return;
      }
    }

    if (urlPath.endsWith("/")) urlPath += "index.html";

    const filePath = safeJoin(rootDir, urlPath);
    if (!filePath.startsWith(rootDir)) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }

    if (!(await fileExists(filePath))) {
      await serve404(req, res);
      return;
    }

    await serveFile(req, res, filePath, requestUrl.pathname);
  } catch (error) {
    res.writeHead(500);
    res.end("Internal error");
    console.error(error);
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Preview: http://127.0.0.1:${port}/ (root: ${rootDir})`);
});

