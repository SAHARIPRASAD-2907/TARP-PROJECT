const nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

const checkIfNumber = (x) => {
  console.log(x);
  let bool = false;
  for (let i = 0; i < nums.length; i++) {
    console.log(x === nums[i]);
    if (x === nums[i]) {
      bool = true;
    }
  }
  return bool;
};

module.exports = {
  checkIfNumber,
};
