require("dotenv").config();
const express = require("express");
const app = express();
const multer = require("multer");
// const upload = multer({ dest: "tmp-uploads" });
const upload = require(__dirname + "/modules/upload-images");
const session = require("express-session");

app.set("view engine", "ejs");
// 設定網址的大小寫是否有差異
app.set("case sensitive routing", true);

// ---------- Top-level middleware -----------------------------
// session 的 secret是加密用的字串, 可以直接寫或是從別的地方引(像是env)
app.use(
    session({
        saveUninitialized: false,
        resave: false,
        secret: "qobdxpziehpfqhqaaodmmvlshvnbdoxf",
        cookie: {
            maxAge: 1800000, // 30 mins
            httpOnly: false, // 限制是否只能用http的擋頭寫入
            // domain: 現在domain不能設定第三方cookie了
            // expires: expires和maxAge只會使用一個, 看誰是最後定義的來決定
        },
    })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// 做一個middleware但cb不結束他用next把資料繼續傳下去, 就會讓全部的都帶有中間插入的資訊, 或是處理過的資料
app.use((req, res, next) => {
    res.locals.topMiddleWare = "提前設定";
    next();
});

// ---------- route -----------------------------------------------
app.get("/try-qs", (req, res) => {
    res.json(req.query);
});

app.get("/try-params1/:action/:id", (req, res) => {
    res.json({ code: 2, params: req.params });
});
app.get("/try-params1/:action/", (req, res) => {
    res.json({ code: 3, params: req.params });
});
app.get("/try-params1/:action?/:id?", (req, res) => {
    res.json({ code: 1, params: req.params });
});
// app.get("/try-params1/*/*?", (req, res) => {
//     res.json({ code: 0, params: req.params });
// });

app.get(/^\/Hi\/?/i, (req, res) => {
    res.json({ code: "reg", url: req.url });
});
app.get(["/aaa", "/bbb"], (req, res) => {
    res.json({ code: "array", url: req.url });
});

app.get("/try-json", (req, res) => {
    const data = require(__dirname + "/data/data01");
    // 不用再用json parse 會直接幫忙轉換成array
    console.log(data);
    res.json(data);
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

// single:單一檔案, array:一個input多個檔案, fields: 多個input多個檔案, none:不上傳檔案
app.post("/post-uploaded", upload.single("avator"), (req, res) => {
    res.json(req.file);
});

app.post("/post-uploadeds", upload.array("photos"), (req, res) => {
    res.json(req.files);
});

// router的使用
const adminsRouter = require(__dirname + "/routes/admins");
// 這邊是把router當middleware使用
// prefix 路徑前綴
app.use("/admins", adminsRouter);
app.use(adminsRouter);

// session 設定my_var來計算啟動
app.get("/try-session", (req, res) => {
    req.session.my_var = req.session.my_var || 0;
    req.session.my_var++;
    res.json({
        my_var: req.session.my_var,
        session: req.session,
    });
});

app.get("/", (req, res) => {
    res.render("main", { name: "001" });
});

// ----------- static folder --------------------------------------
app.use(express.static("public"));
app.use("/bootstrap", express.static("node_modules/bootstrap/dist"));

// ----------- 404 ------------------------------------------------
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
