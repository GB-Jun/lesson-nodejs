require("dotenv").config();
const express = require("express");
const app = express();

app.set("view engine", "ejs");

// ---------- Top-level middleware -----------
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ---------- route ---------------
app.get("/", (req, res) => {
    res.render("main", { name: "001" });
});

app.get("/try-qs", (req, res) => {
    res.json(req.query);
});

// middleware 中介軟體(function), 他有順序,在使用時如果要多個要用array
const bodyParser = express.urlencoded({ extended: false });
app.post("/try-post", bodyParser, (req, res) => {
    res.json(req.body);
});

app.post("/post", (req, res) => {
    res.end(`<h2>Post here</h2>`);
});

// app.route可以先設定路徑, 之後再分別設定方法
app.route("/try-post-form")
    .get((req, res) => {
        res.render("try-post-form");
    })
    .post((req, res) => {
        // 從用戶寄來的資料裡的body拿email, password展開設定, 然後在render時放回資料
        const { email, password } = req.body;
        res.render("try-post-form", { email, password });
    });

// ----------- static folder ------------
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
