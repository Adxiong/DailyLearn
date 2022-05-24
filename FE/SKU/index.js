/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-05-24 17:38:07
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-05-24 17:50:08
 */
let names = ["iPhone X", "iPhone XS"]

let colors = ["黑色", "白色"]

let storages = ["64g", "256g"]

function combine(...chunks) {
  const res = []

  function helper(chunkIndex, prev) {
    let chunk = chunks[chunkIndex]
    const isLast = chunkIndex === chunks.length - 1

    for (let val of chunk) {
      const cur = prev.concat(val)
      if (isLast) {
        res.push(cur)
      } else {
        helper(chunkIndex + 1, cur)
      }
    }
  }

  helper(0, [])

  return res
}

const res = combine(names, colors, storages)
console.log(res);
