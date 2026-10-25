// Tiny static server for local testing: `node serve.js` then open http://localhost:5173
// (The site also works by double-clicking index.html — this is just for previews / LAN testing.)
const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT) || 5173;
const types = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".ico": "image/x-icon",
  ".mp4": "video/mp4", ".webm": "video/webm", ".ogg": "video/ogg", ".mp3": "audio/mpeg", ".wav": "audio/wav"
};

http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split("?")[0]);
  const file = path.normalize(path.join(root, url === "/" ? "index.html" : url));
  if (!file.startsWith(root)) { res.writeHead(403); return res.end(); }

  fs.stat(file, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      return res.end("Not found");
    }

    const ext = path.extname(file).toLowerCase();
    const contentType = types[ext] || "application/octet-stream";
    const range = req.headers.range;

    if (range && ext === ".mp4") {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;
      const chunksize = (end - start) + 1;
      const stream = fs.createReadStream(file, { start, end });
      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${stats.size}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": contentType,
        "Cache-Control": "no-store"
      });
      stream.pipe(res);
    } else {
      res.writeHead(200, {
        "Content-Length": stats.size,
        "Accept-Ranges": "bytes",
        "Content-Type": contentType,
        "Cache-Control": "no-store"
      });
      fs.createReadStream(file).pipe(res);
    }
  });
}).listen(port, () => console.log(`Wheel of Curses on http://localhost:${port}`));
