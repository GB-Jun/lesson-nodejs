require("dotenv").config();
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send(`<h2>安安</h2>`);
});

app.listen(process.env.EXPRESS_PORT, () => {
    console.log(
        `Server started at http://localhost:${process.env.EXPRESS_PORT}`
    );
});
