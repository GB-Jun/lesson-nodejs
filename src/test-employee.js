const Person = require(__dirname + "/person");
const Employee = require(__dirname + "/employee");

const p1 = new Person("Bill", 20);
const p2 = new Employee("Willson", 40, "W007");

console.log(p1);
console.log("" + p1);
console.log(p2);
console.log("" + p2);
