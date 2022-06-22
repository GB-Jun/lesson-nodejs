const { f, f3 } = require("./func02");
const { f: a, f3: a3 } = require("./func02");

// require只要執行過後就會有紀錄, 重複執行時就不會再次執行, 只會取得需要的部分

console.log(f(7));
console.log(a3(7));
