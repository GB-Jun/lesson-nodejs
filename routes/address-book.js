const { Router } = require("express");
const express = require("express");
const router = express.Router(); // 建立route物件
const db = require(__dirname + "/../modules/mysql-connect-mfee26");

router.get("/", async (req, res) => {
    let output = {
        perPage: 5,
        page: 1,
        totalRows: 0,
        totalPage: 0,
        rows: [],
    };
    let page = +req.query.page || 1;
    if (page < 1) {
        return res.redirect("?page=1");
        // 中間如果用了會回傳的res.動作, 要在if裡面return來結束func
        // 如果用?來寫, 代表前面的路徑都一樣
    }

    const sqlnum = "SELECT COUNT(1) totalRows FROM `address_book`";
    // const [result01] = await db.query(sqlnum);
    // const [[result01]] = await db.query(sqlnum);
    const [[{ totalRows }]] = await db.query(sqlnum);

    let totalPage = 0;
    if (totalRows) {
        totalPage = Math.ceil(totalRows / output.perPage);
        if (page > totalPage) {
            return res.redirect(`?page=${totalPage}`);
        }

        const sqlData = `SELECT * FROM address_book LIMIT ${
            (page - 1) * output.perPage
        }, ${output.perPage}`;
        const [result02] = await db.query(sqlData);
        output.rows = result02;
    }

    output = { ...output, page, totalRows, totalPage };
    res.render('address-book/main',output);
});

module.exports = router;
