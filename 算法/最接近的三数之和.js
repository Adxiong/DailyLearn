/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-06-20 21:50:34
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-06-20 22:04:26
 */


var threeSumClosest = function (nums, target) {
  let base = Math.pow(10, 7)
  nums = nums.sort((a, b) => a - b)
  for (let first = 0; first < nums.length; first++) {
    if (first > 0 && nums[first] == nums[first - 1]) {
      continue
    }
    let second = first + 1;
    let third = nums.length - 1;
    while (second < third) {
      let sum = nums[first] + nums[second] + nums[third]
      if (sum == target) {
        return sum
      }
      let abcValue = Math.abs(nums[first] + nums[second] + nums[third] - target)
      if (abcValue < Math.abs(base - target)) {
        base = nums[first] + nums[second] + nums[third]
      }

      if (sum > target) {
        let third0 = third - 1
        while (second < third0 && nums[third0] == nums[third]) {
          --third0
        }
        third = third0
      } else {
        let second0 = second + 1
        while (second0 < third && nums[second0] == nums[second]) {
          ++second0
        }
        second = second0
      }

    }
  }
  return base
};

console.log(threeSumClosest([0, 0, 0], 1))