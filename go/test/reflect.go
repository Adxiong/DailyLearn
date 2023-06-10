/*
 * @Description:
 * @version:
 * @Author: Adxiong
 * @Date: 2023-02-07 00:49:51
 * @LastEditors: Adxiong
 * @LastEditTime: 2023-02-07 01:08:58
 */
package main

import (
	"fmt"
	"reflect"
)

type test1 struct {
	key int
}

type test struct {
	Name  string
	IDS   map[uint64]uint64
	Test1 map[uint64]*test1
}

func main() {

	t := test{
		Name: "adxiong",
		IDS:  map[uint64]uint64{13: 123},
		Test1: map[uint64]*test1{
			12: &test1{
				key: 1,
			},
		},
	}

	types := reflect.TypeOf(t)
	// values := reflect.ValueOf(t)
	for i := 0; i < types.NumField(); i++ {
		// fmt.Printf("%+v\n", types.Field(i))
		// fmt.Printf("%s\n", types.Field(i).Type.Elem().Kind())

		switch types.Field(i).Type.String() {
		case "map[uint64]uint64":
			fmt.Println("hit")

		default:
			fmt.Println(types.Field(i).Type.String())
		}
	}
}
