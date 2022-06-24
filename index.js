require("dotenv").config();
const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/try-qs", (req, res) => {
    res.json(req.query);
});

app.get("/", (req, res) => {
    res.render("main", { name: "001" });
});

app.post("/post", (req, res) => {
    res.end(`<h2>Post here</h2>`);
});


// ----------- static ------------
app.use(express.static("public"));
app.use("/bootstrap", express.static("node_modules/bootstrap/dist"));

// ----------- 404 -------------
app.use((req, res) => {
    res.send(`<h2>404 - Not Found 找不到頁面</h2>
    <img src="/imgs/404-error-page01.jpg" alt=""/>`);
});

// ------------ listen -----------
app.listen(process.env.EXPRESS_PORT, () => {
    console.log(
        `Server started at http://localhost:${process.env.EXPRESS_PORT}`
    );
});
