/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-04-09 14:52:17
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-04-09 14:52:18
 */
const randomSalt = () => {
  const data = ["1","2","3","4","5","6","7","8","9","0","a","b","c","d","e","f","g","h","i","j","k",'l',"m",'n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P',"Q",'R','S',"T",'U',"V",'W','X','Y','Z']
  let code = ""
  let count = 6
  for( let i = 0 ; i < count; i++){
    code += data[Math.floor(Math.random()*data.length)]
  }
  return code
}