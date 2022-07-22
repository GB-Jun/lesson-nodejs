const db = require(__dirname + "/../modules/mysql-connect-mfee26.js");

const bcrypt = require("bcryptjs");

const sql =
    "INSERT INTO `admin`(`account`, `pass_hash`, `created_at`) VALUES ('ming', ?, NOW())";

(async () => {
    var hash = await bcrypt.hash("123456", 10);

    console.log(hash);

    const r = await db.query(sql, [hash]);
    console.log(r);
    process.exit();
})();
