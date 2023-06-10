/*
 * @Description:
 * @version:
 * @Author: Adxiong
 * @Date: 2023-02-24 00:59:11
 * @LastEditors: Adxiong
 * @LastEditTime: 2023-04-05 16:55:19
 */
package main

import (
	"context"
	"fmt"
	"time"
)

func main() {

	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)

	defer cancel()

	go handle(ctx, 1500*time.Millisecond)

	select {
	case <-ctx.Done():
		fmt.Println("main end")
	}

}

func handle(ctx context.Context, t time.Duration) {
	select {
	case <-ctx.Done():
		fmt.Println("child end")
	case <-time.After(t):
		fmt.Println("child process end")
	}
}
