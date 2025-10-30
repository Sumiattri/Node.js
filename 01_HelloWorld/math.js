function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

// module.exports = add;
// module.exports = subtract;

// the last export over writes the previous one, if we want to export multiple items , we can do like below

// module.exports = { add, subtract };

module.exports = { addFxn: add, subFxn: subtract };

// if you want to use multiple exports without one overwriting others , we can use named exports like below

// exports.add = () => a+b ;
// exports.subtract = () => a-b ;
