const http = require("http");

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/html",
    });
    res.end(`<h2>Hello</h2>
    <p>${req.url}</p>`);
});

server.listen(3000);

console.log('Server start at http://localhost:3000')