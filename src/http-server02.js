const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
    });
    fs.writeFile(
        __dirname + "/../data/header01.txt",
        JSON.stringify(req.headers),
        (error) => {
            if (error) {
                console.log("error");
                res.end(`<h1>發生錯誤</h1>`);
            } else {
                res.end(`<h1>完成寫入</h1>`);
            }
        }
    );
});

server.listen(3000);

console.log("Server start at http://localhost:3000");
