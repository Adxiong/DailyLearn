/*
 * @Description:
 * @version:
 * @Author: Adxiong
 * @Date: 2022-10-03 15:07:51
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-10-05 16:02:37
 */
package main

import (
	"bytes"
	"fmt"
	"log"
	"net"
	"net/url"
	"os"
	"strings"
)

func NewService() {
	server, error := net.Listen("tcp", ":9999")
	if error != nil {
		log.Println("error", error)
	}
	for {
		client, errConn := server.Accept()
		if errConn != nil {
			log.Println("error", errConn)
		}

		go handleClientRequest(client)
	}

}

func handleClientRequest(client net.Conn) {
	if client == nil {
		return
	}
	defer func() {
		client.Close()
	}()
	b := make([]byte, 4096)
	_, err := client.Read(b)
	if err != nil {
		log.Println("error", err)
		return
	}
	fmt.Println(string(b))
	var method, address string
	fmt.Sscanf(string(b[:bytes.IndexByte(b, '\n')]), "%s%s", &method, &address)
	hostPortUrl, errHostPortUrl := url.Parse(address)
	if errHostPortUrl != nil {
		// log.Println(errHostPortUrl)
		return
	}

	if hostPortUrl.Opaque == "443" {
		address = hostPortUrl.Host + ":443"
	} else if strings.Index(hostPortUrl.Host, ":") == -1 {
		address = hostPortUrl.Host + ":80"
	}

	// fmt.Println(address)
	// fmt.Println(string(b))

	server, errServer := net.Dial("tcp", address)
	if errServer != nil {
		log.Println("error", errServer)
		return
	}
	if method == "CONNECT" {
		fmt.Fprint(client, "HTTP/1.1 200 Connection established\r\n")
	} else {
		server.Write(b)
	}

	var httpBody string
	var httpSize int
	for {
		a := make([]byte, 4096)
		len, err := server.Read(a)
		if err != nil {
			log.Println(err)
		}
		httpBody += string(a[:len])
		httpSize += len
		if a[len-1] == '\n' && len < 4096 {
			break
		}
	}
	strArr := strings.Split(httpBody, "\r\n\r\n")
	chunkedArr := strings.Split(strArr[1], "\n")
	respBody := ""
	for index, val := range chunkedArr {
		if (index+1)%2 == 0 {
			respBody += val
		}
	}

	f, err := os.OpenFile("./index.html", os.O_RDWR|os.O_CREATE, 0666)
	if err != nil {
		fmt.Println("写入失败")
	}
	_, errWr := f.Write([]byte(respBody))

	if errWr != nil {
		fmt.Println(err)
	}

	f.Close()

	client.Write([]byte(httpBody))

}

func main() {
	NewService()
}
