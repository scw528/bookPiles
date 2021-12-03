//Installed node modules: jquery underscore request express jade shelljs passport http sys lodash async mocha moment connect validator restify ejs ws co when helmet wrench brain mustache should backbone forever debug
process.stdin.resume();
process.stdin.setEncoding('utf8');
var util = require('util');
var input = "";
var values = {
  startingHeight: 0,
  stableHeight: 0,
  numberOfPartitions: 0
}

process.stdin.on('data', function (text) {
    input += text;
});

process.stdin.on('end', function () {
    //do your processing here.
    let inputArray = input.split(' ')
    if (inputArray.length != 3) {
      // input is invalid, return false
      return false
    } else {
      // update the values
      values.startingHeight = parseInt(inputArray[0])
      values.stableHeight = parseInt(inputArray[1])
      values.numberOfPartitions = parseInt(inputArray[2])
      
      // result will hold the unique stack sizes which are less or equal to stableHeight
      let result = partition(values, [], 0);
      
      // find an array that only contains values of result, that adds up to startingHeight
      console.log(result.length)
      return result.length
    }
  
  
});

function partition(values, result, index) {
  var result = result;
  var minLength = 0;
  
  if (values.startingHeight < values.numberOfPartitions) {
    // set the minimum length the the number of partitions if our starting height
    // (number of books) is less than the the number of partitions
    minLength = values.numberOfPartitions
  }
  
  if (values.startingHeight % 2 == 0) {
    // even: each subarray will be half of the original height
    let half = Math.floor(values.startingHeight / 2)
    let newResult = new Array(2).fill(half)
    // add the new sub array to the index of the previous stack.
    // ex. OLD: [6] -> NEW: [3, 3]
    result.splice.apply(result, [index, 1].concat(newResult));    
  } else {
      // odd: first element of new subarray will be half, second will be half + 1
      let half = Math.floor(values.startingHeight / 2)
      let halfPlusOne = half + 1
      let newResult = new Array(2)
      newResult[0] = half;
      newResult[1] = halfPlusOne;
      // add the new sub array to the index of the previous stack.
      // ex. OLD: [7] -> NEW: [3, 4]
      result.splice.apply(result, [index, 1].concat(newResult));
  }

  // loop over each element of result. If the element is larger than the stable height,
  // or if we do not have the maximum amount of elements that satisfy the initial conditions,
  // call the function again
  result.forEach((value, index) => {
    if (value > values.stableHeight || (value > 1 && minLength > result.length)) {
      let data = {
        startingHeight: value,
        stableHeight: values.stableHeight,
        numberOfPartitions: values.numberOfPartitions
      }
      partition(data, result, index)
    }
  })
  
  return result;
}