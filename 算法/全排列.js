/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-07-02 22:38:37
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-07-02 22:46:23
 */
var permute = function (nums) {
  const res = []

  function helper(arr) {
    if (arr.length == nums.length) {
      res.push([...arr])
    } else {
      const newArr = nums.filter(item => !arr.includes(item))
      for (let i = 0; i < newArr.length; i++) {
        arr.push(newArr[i])
        helper(arr)
        arr.pop()
      }
    }
  }

  helper([])

  return res
};

console.log(permute([1, 2, 3]))