/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-06-21 19:29:30
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-06-22 22:09:27
 */
var letterCombinations = function (digits) {
  var wordMap = ['abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']
  var containers = []
  var container = []
  function helper(index) {
    if (index == digits.length) {
      [...container].join("") && containers.push([...container].join(""))
    } else {
      var digit = digits[index] - 2
      for (let i = 0; i < wordMap[digit].length; i++) {
        container.push(wordMap[digit][i])
        helper(index + 1)
        container.pop()
      }
    }

  }
  helper(0)
  return containers
};

console.log(letterCombinations("23"))
console.log(letterCombinations(""))
