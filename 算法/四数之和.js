/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-06-25 21:55:33
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-06-25 22:09:45
 */
var fourSum = function (nums, target) {
  var list = []
  if (nums.length < 4) {
    return []
  }
  nums = nums.sort((a, b) => a - b)

  for (let first = 0; first < nums.length; first++) {
    if (first > 0 && nums[first] == nums[first - 1]) {
      continue
    }
    for (let second = first + 1; second < nums.length; second++) {
      if (second > first + 1 && nums[second] == nums[second - 1]) {
        continue
      }
      var forth = nums.length - 1
      for (let three = second + 1; three < nums.length; three++) {
        if (three > second + 1 && nums[three] == nums[three - 1]) {
          continue
        }
        while (forth > three && nums[first] + nums[second] + nums[three] + nums[forth] > target) {
          --forth
        }
        if (forth == three) {
          break
        }
        if (three && nums[first] + nums[second] + nums[three] + nums[forth] == target) {
          list.push([nums[first], nums[second], nums[three], nums[forth]])
        }

      }
    }
  }
  return list
};

console.log(fourSum([1, 0, -1, 0, -2, 2], 0))