/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-06-19 21:42:38
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-06-19 21:58:28
 */

var threeSum = function (nums) {
  var list = []
  if (nums.len < 3) return list
  nums = nums.sort((a, b) => (a - b))
  console.log(nums)
  for (let first = 0; first < nums.length; first++) {
    if (first > 0 && nums[first] == nums[first - 1]) {
      continue
    }
    target = -nums[first]
    let third = nums.length - 1
    for (let second = first + 1; second < nums.length; second++) {
      if (second > first + 1 && nums[second] == nums[second - 1]) {
        continue
      }
      while (third > second && nums[third] + nums[second] > target) {
        --third
      }

      if (third == second) {
        break
      }
      if (nums[second] + nums[third] == target) {
        list.push([nums[first], nums[second], nums[third]])
      }
    }
  }
  return list
};


console.log(threeSum([-1, 0, 1, 2, -1, -4, -2, -3, 3, 0, 4]))


