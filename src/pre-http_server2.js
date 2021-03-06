const http = require("http"),
    fs = require("fs");
http.createServer((request, response) => {
    fs.writeFile(
        __dirname + "/../data/data01.json",
        JSON.stringify(request.headers),
        (error) => {
            if (error) return console.log(error);
            console.log("HTTP檔頭儲存");

            fs.readFile(__dirname + "/../data/data01.html", (error, data) => {
                if (error) {
                    response.writeHead(500, { "Content-Type": "text/plain" });
                    response.end("500 - data01.html not found");
                } else {
                    response.writeHead(200, { "Content-Type": "text/html" });
                    response.end(data);
                }
            });
        }
    );
}).listen(3000);

console.log("Server start at http://localhost:3000");
