require("dotenv").config();
// require("dotenv").config({path: '/.../.../.env'}); // 引入其他地方的.env檔案


const { DB_HOST, DB_USER, NODE_ENV } = process.env;

console.log({ DB_HOST, DB_USER, NODE_ENV });
