function genObject() {
    return {
        name: "peter",
        age: 20,
    };
}

genObject.method01 = () => {
    console.log("method01");
};

const obj = genObject();
console.log(obj);
genObject.method01();

console.log(genObject);
console.log(genObject.constructor.name);