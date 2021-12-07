let x = ["c", "b", "a", 1, 2, 3, 4];
let y = [];
x.forEach((x) => {
  if (typeof x === "number") {
    y.push("#");
  }
  y.push(x);
});

console.log(y);
