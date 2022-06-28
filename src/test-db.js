const db = require(__dirname + "/../modules/mysql-connect");

(async () => {
    const [results, fields] = await db.query(
        "SELECT * FROM `products` LIMIT 5"
    );
    // 這邊只有query可以用, 取得出來的值只有一個, 會是一個array
    // fields會是欄位資訊, 通常用不到

    console.log(results);
    console.log(fields);
    // 當使用promise時, node執行完畢不會自動結束, 而會維持在pending的狀態, 要自己結束或是下prosess.exit()來結束他, 結束的語句要寫在async的範圍內才不會還沒取得完資料就直接結束
    process.exit();
})();

