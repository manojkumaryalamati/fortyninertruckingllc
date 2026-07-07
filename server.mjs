import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const distDir = resolve(__dirname, "artifacts", "forty-niner", "dist", "public");
const port = Number(process.env.PORT || 8080);
const host = "0.0.0.0";

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
};

function resolveFilePath(urlPath) {
  const decodedPath = decodeURIComponent(urlPath.split("?")[0]);
  const cleanPath = normalize(decodedPath).replace(/^([.][.][/\\])+/, "");
  const candidate = resolve(distDir, "." + sep + cleanPath);
  if (candidate !== distDir && !candidate.startsWith(distDir + sep)) {
    return null;
  }
  return candidate;
}

function sendFile(res, filePath, statusCode = 200) {
  const ext = extname(filePath);
  res.writeHead(statusCode, {
    "Content-Type": mimeTypes[ext] || "application/octet-stream",
    "Cache-Control":
      ext === ".html" ? "no-cache" : "public, max-age=31536000, immutable",
  });
  const stream = createReadStream(filePath);
  stream.on("error", () => {
    res.destroy();
  });
  stream.pipe(res);
}

const server = createServer((req, res) => {
  try {
    const urlPath = req.url || "/";

    if (urlPath.split("?")[0].startsWith("/api/")) {
      res.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ error: "API not available on this deployment" }));
      return;
    }

    if (!existsSync(distDir)) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Production build folder not found. Run the build first.");
      return;
    }

    const filePath = resolveFilePath(urlPath);
    if (
      filePath &&
      existsSync(filePath) &&
      statSync(filePath).isFile()
    ) {
      sendFile(res, filePath);
      return;
    }

    sendFile(res, join(distDir, "index.html"));
  } catch {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Server error");
  }
});

server.listen(port, host, () => {
  console.log(
    `Forty Niner Trucking LLC server listening on http://${host}:${port}`,
  );
});
