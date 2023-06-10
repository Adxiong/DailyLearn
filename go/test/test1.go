package main

import "fmt"

func main() {
	resource := NewTestResource()
	sink := NewDiscard()
	m1 := NewMap(func(v interface{}) interface{} {
		return map[string]interface{}{
			"value": v,
		}
	})

	Via(resource, sink, NewPrint(), m1, NewPrint())
}

// 只读 interface
type Outlet interface {
	Out() <-chan interface{}
}

// 只写 interface
type Inlet interface {
	In() chan<- interface{}
}

// 流 interface 有读 有写
type Flow interface {
	Outlet
	Inlet
}

// 过滤interface
type Filter interface {
	Filter(interface{}) bool
}

// 输出结构体，有两个channel
type Print struct {
	in  chan interface{}
	out chan interface{}
}

// 创建一个printf 结构体
func NewPrint() *Print {
	act := &Print{
		in:  make(chan interface{}),
		out: make(chan interface{}),
	}
	// 协程处理流
	go act.doStream()
	return act
}

// 拿到输入channel
func (ff Print) In() chan<- interface{} {
	return ff.in
}

// 拿到输出channel
func (ff Print) Out() <-chan interface{} {
	return ff.out
}

// 处理流
func (ff Print) doStream() {
	// 从输入channel中获取，进行打印，并且输出到输出流中
	for elem := range ff.in {
		fmt.Println(elem)
		ff.out <- elem
	}
	// 写完关闭输出流
	close(ff.out)
}

// 资源 读channel
type Resource interface {
	Outlet
}

// 资源 结构体 有一个channel
type TestResource struct {
	out chan interface{}
}

// 挖掘 写channel
type Sink interface {
	Inlet
}

// 实例资源结构体
func NewTestResource() *TestResource {
	tr := &TestResource{
		out: make(chan interface{}),
	}
	// out中写入1，100
	go func() {
		defer close(tr.out)
		for i := 0; i < 100; i++ {
			tr.out <- i
		}
	}()
	return tr
}

// 返回只读
func (tr TestResource) Out() <-chan interface{} {
	return tr.out
}

// map 结构体
type Map struct {
	fn  func(interface{}) interface{}
	in  chan interface{}
	out chan interface{}
}

// 初始化map，两个channel 一个fn
func NewMap(fn func(interface{}) interface{}) *Map {
	m := &Map{
		fn:  fn,
		in:  make(chan interface{}),
		out: make(chan interface{}),
	}
	// 处理stream
	go m.doStream()
	return m
}

// map 拿取只读channel
func (m Map) Out() <-chan interface{} {
	return m.out
}

// map 拿取只写channel
func (m Map) In() chan<- interface{} {
	return m.in
}

// map 处理流 把处理输入到内容 输出到 只读channel
func (m Map) doStream() {
	for elem := range m.in {
		m.out <- m.fn(elem)
	}
	close(m.out)
}

// 处理两个流
func Via(resource Resource, to Sink, flows ...Flow) {
	var (
		cur Outlet = resource
	)

	for i := 0; i < len(flows); i++ {
		go DoStream(cur, flows[i])
		cur = flows[i]
	}

	go DoStream(cur, to)
}

func DoStream(out Outlet, in Inlet) {
	go func() {
		for elem := range out.Out() {
			in.In() <- elem
		}
		close(in.In())
	}()
}

type Discard struct {
	in chan interface{}
}

func NewDiscard() *Discard {
	te := &Discard{
		in: make(chan interface{}),
	}
	go func() {
		for range te.in {

		}
	}()
	return te
}

func (m Discard) In() chan<- interface{} {
	return m.in
}
