/*
 * @Description:
 * @version:
 * @Author: Adxiong
 * @Date: 2022-08-06 14:57:48
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-08-07 00:03:11
 */
package main

import (
	"fmt"
	"runtime"
	"strings"
)

type LogType string

type LogFactory interface {
	GenMessage() string
}

const (
	Fatal_Type   LogType = "Fatal"
	Trace_Type   LogType = "Trace"
	Warning_Type LogType = "Warning"
	Notice_Type  LogType = "Notice"
	Error_Type   LogType = "Error"
	Output_Type  LogType = "Output"
)

func init() {

}

func GetCaller() []string {
	pc, _, _, _ := runtime.Caller(2)
	caller := runtime.FuncForPC(pc).Name()
	arr := strings.Split(caller, ".")
	for i, v := range arr {
		arr[i] = strings.Title(v)
	}
	return arr
}

type Message interface {
	// SetMessage() string
	GetMessage() string
	GetType() string
}

type Fatal struct {
	action string
}

func (f *Fatal) GetMessage() string {
	arr := GetCaller()
	if len(f.action) > 0 {
		arr = append(arr, f.action)
	}
	arr = append([]string{f.GetType()}, arr...)
	result := strings.Join(arr, "_")
	return result
}

func (Fatal) GetType() string {
	return string(Fatal_Type)
}

type Trace struct {
	action string
}

func (t *Trace) GetMessage() string {
	arr := GetCaller()
	if len(t.action) > 0 {
		arr = append(arr, t.action)
	}
	arr = append([]string{t.GetType()}, arr...)
	result := strings.Join(arr, "_")
	return result
}

func (Trace) GetType() string {
	return string(Trace_Type)
}

type Warning struct {
	action string
}

func (w *Warning) GetMessage() string {
	arr := GetCaller()
	if len(w.action) > 0 {
		arr = append(arr, w.action)
	}
	arr = append([]string{w.GetType()}, arr...)
	result := strings.Join(arr, "_")
	return result
}

func (Warning) GetType() string {
	return string(Warning_Type)
}

type Notice struct {
	action string
}

func (n *Notice) GetMessage() string {
	arr := GetCaller()
	if len(n.action) > 0 {
		arr = append(arr, n.action)
	}
	arr = append([]string{n.GetType()}, arr...)

	result := strings.Join(arr, "_")
	return result
}
func (Notice) GetType() string {
	return string(Notice_Type)
}

type Error struct {
	action string
}

func (e *Error) GetMessage() string {
	arr := GetCaller()
	if len(e.action) > 0 {
		arr = append(arr, e.action)
	}
	arr = append([]string{e.GetType()}, arr...)

	result := strings.Join(arr, "_")
	return result
}

func (Error) GetType() string {
	return string(Error_Type)
}

type Output struct {
	action string
}

func (o *Output) GetMessage() string {
	arr := GetCaller()
	if len(o.action) > 0 {
		arr = append(arr, o.action)
	}
	arr = append([]string{o.GetType()}, arr...)

	result := strings.Join(arr, "_")
	return result
}

func (Output) GetType() string {
	return string(Output_Type)
}

var logFactory = make(map[LogType]LogFactory)

func RegisterLog(msg_type LogType, cb LogFactory) {
	_, ok := logFactory[msg_type]
	if !ok {
		fmt.Println("log_func has been registered already")
	} else {
		fmt.Println("register log_func", msg_type)
		logFactory[msg_type] = cb
	}
}

// LogMessage 生成指定类型的消息对象
func LogMessage(msg_type LogType, action string) Message {
	fmt.Println("类型=====》", msg_type)
	if msg_type == Fatal_Type {
		return &Fatal{
			action,
		}
	}
	if msg_type == Trace_Type {
		return &Trace{
			action,
		}
	}
	if msg_type == Warning_Type {
		return &Warning{
			action,
		}
	}
	if msg_type == Notice_Type {
		return &Notice{
			action,
		}
	}
	if msg_type == Error_Type {
		return &Error{
			action,
		}
	}
	if msg_type == Output_Type {
		return &Output{
			action,
		}
	}
	return nil
}

func main() {
	fatal := LogMessage(Fatal_Type, "Response nil")
	fmt.Println("消息", fatal.GetMessage(), fatal.GetType())

	error := LogMessage(Error_Type, "Response Status is (0) ")
	fmt.Println("消息", error.GetMessage(), error.GetType())

	trace := LogMessage(Trace_Type, "")
	fmt.Println("消息", trace.GetMessage(), trace.GetType())

	test := LogMessage("ss", "")
	fmt.Println("消息", test.GetMessage(), test.GetType())

}
