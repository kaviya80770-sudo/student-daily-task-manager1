const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;

const mimeTypes = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8"
};

const server = http.createServer((req, res) => {
    let urlPath = (req.url || "/").split("?")[0];

    if (urlPath === "/") {
        urlPath = "/index.html";
    }

    let decodedPath;

    try {
        decodedPath = decodeURIComponent(urlPath);
    } catch {
        res.writeHead(400);
        res.end("Invalid URL");
        return;
    }

    const root = path.resolve(__dirname);
    const filePath = path.resolve(root, "." + decodedPath);

    if (
        filePath !== root &&
        !filePath.startsWith(root + path.sep)
    ) {
        res.writeHead(403);
        res.end("Forbidden");
        return;
    }

    fs.readFile(filePath, (error, data) => {
        if (error) {
            res.writeHead(404, {
                "Content-Type": "text/plain; charset=utf-8"
            });
            res.end("File not found");
            return;
        }

        const extension = path.extname(filePath);
        const contentType =
            mimeTypes[extension] || "application/octet-stream";

        res.writeHead(200, {
            "Content-Type": contentType
        });

        res.end(data);
    });
});

server.listen(PORT, "0.0.0.0", () => {
    console.log("Student Daily Task Manager running on port " + PORT);
});
