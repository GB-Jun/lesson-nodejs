const { Router } = require("express");
const express = require("express");
const router = express.Router(); // 建立route物件

router.get("/r1/:action?/:id?", (req, res) => {
    res.json({
        url: req.url,
        baseUrl: req.baseUrl,
        originalUrl: req.originalUrl,
        params: req.params,
        code: "admins.js r1",
    });
});

router.get("/r2/:action?/:id?", (req, res) => {
    res.json({
        url: req.url,
        baseUrl: req.baseUrl,
        originalUrl: req.originalUrl,
        params: req.params,
        code: "admins.js r2",
    });
});

module.exports = router;
