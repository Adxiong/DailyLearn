/*
 * @Description:
 * @version:
 * @Author: Adxiong
 * @Date: 2022-12-06 00:44:48
 * @LastEditors: Adxiong
 * @LastEditTime: 2023-04-24 22:04:01
 */
package main

import (
	"encoding/json"
	"fmt"
)

type Test struct {
	Name string `json:"name"`
	Tel  uint64 `json:"tel"`
	Info string `json:"info"`
}

func main() {
	str := []byte(`{"name":"adxiong","tel":1234}`)
	// var data map[string]interface{}
	data := &Test{}
	err := json.Unmarshal(str, data)
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	// fmt.Printf("%+v", data)
	var d map[string]string = make(map[string]string, 0)
	d["a"] = data.Info
	fmt.Printf("%+v", d)
}
