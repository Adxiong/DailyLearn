/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-06-26 21:56:05
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-06-26 22:19:07
 */

/**
 * 递归解法
 * @param {} n 
 */
var generateParenthesis = function (n) {
  var ans = []
  function helper(str) {
    if (str.length == 2 * n) {
      if (valid(str)) {
        ans.push(str.join(""))
      }
    } else {
      str.push("(")
      helper(str)
      str.pop()
      str.push(")")
      helper(str)
      str.pop()
    }
  }

  function valid(str) {
    var balance = 0
    for (let i = 0; i < str.length; i++) {
      if (str[i] == "(") {
        ++balance
      } else {
        --balance
      }
      if (balance < 0) {
        return false
      }
    }
    return balance == 0
  }
  helper([])
  return ans
};

/**
 * 动态规划解法
 * @param {*} n 
 */
var generateParenthesis1 = (n) => {
  var ans = []

  function helper(str, left, right) {
    if (str.length == 2 * n) {
      if (valid(str)) {
        ans.push(str.join(""))
      }
    } else {
      if (left < n) {
        str.push('(')
        helper(str, left + 1, right)
        str.pop()
      }
      if (right < n) {
        str.push(')')
        helper(str, left, right + 1)
        str.pop()
      }
    }
  }

  function valid(str) {
    var balance = 0
    for (let i = 0; i < str.length; i++) {
      if (str[i] == '(') {
        ++balance
      } else {
        --balance
      }

      if (balance < 0) {
        return false
      }
    }
    return balance == 0
  }

  helper([], 0, 0)
  return ans
}


console.log('递归解法====》', generateParenthesis(3))

console.log('动态规划解法====》', generateParenthesis1(3))