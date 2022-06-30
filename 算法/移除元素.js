/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-06-30 22:38:52
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-06-30 22:38:55
 */
var removeElement = function (nums, val) {
  var left = 0;
  for (let right = 0; right < nums.length; right++) {
    if (nums[right] != val) {
      nums[left] = nums[right]
      left++
    }
  }
  return left
};
