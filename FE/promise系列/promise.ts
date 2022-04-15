/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-04-15 00:23:15
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-04-15 23:51:14
 */


type DefPromiseStatus = "PENDING" |  "FULFILLED" | "REJECTED"

class DefPromise{
  PromiseState: DefPromiseStatus
  PromiseResult: unknown
  onFulFilledCallStack: ((value: any)=>void)[]
  onRejectedCallStack: ((reason: any)=>void)[]

  constructor ( executor: ( resolve: (value: any)=>any, reject?:(error: any)=>any)=>any) {
    this.PromiseState = "PENDING"
    this.PromiseResult = null
    this.onFulFilledCallStack = []
    this.onRejectedCallStack = []
    if (executor) {
      try{
        executor(this.resolve.bind(this), this.reject.bind(this))
      }catch(e) {
        this.reject(e)
      }
    }
  }

  resolve(v: any){
    
    if(this.PromiseState === "PENDING") {
      queueMicrotask(() => {
        this.PromiseState = "FULFILLED"
        this.PromiseResult = v
        while(this.onFulFilledCallStack.length) {
          this.onFulFilledCallStack.shift()!(v)
        }
      });
    }
  }

  reject(reason: any){
    if(this.PromiseState === "REJECTED") {
      queueMicrotask(() => {
        this.PromiseState = "REJECTED"
        this.PromiseResult = reason
        while(this.onRejectedCallStack.length) {
          this.onRejectedCallStack.shift()!(reason)
        } 
      });
    }
  }

  then(onFulfilled: any, onRejected?: any){
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (value: any) => value
    onRejected = typeof onRejected === "function" ? onRejected : (error: any) => {throw error}
    
    const promise = new DefPromise(( resolve, reject)=>{
      if( this.PromiseState === "FULFILLED") {
        try{
          queueMicrotask(() => {
            const x = onFulfilled(this.PromiseResult)
            resolvePromise(promise, x, resolve, reject!)
          });
        }catch(e){
          reject && reject(e)
        }    
      }
      else if(onRejected && this.PromiseState === "REJECTED") {
        try{
          queueMicrotask(() => {
            const e = onRejected(this.PromiseResult)        
            resolvePromise(promise, e, resolve,reject)
          });
        }catch(e){
          reject && reject(e)
        }
      }
      else if( this.PromiseState === "PENDING") {        
          this.onFulFilledCallStack.push(()=>{
            try{
              const x = onFulfilled(this.PromiseResult)
              resolvePromise(promise, x, resolve, reject)
            }catch(e){
              reject && reject(e)
            }
          })
          onRejected && this.onRejectedCallStack.push(()=>{
            try{
              const e = onRejected(this.PromiseResult)
              resolvePromise(promise, e, reject, reject)
            }catch(e){
              reject && reject(e)
            }
          })        
      }
    })
    return promise
  }
}

function resolvePromise (promise: DefPromise, x: unknown, resolve: any, reject: any) {  
  if( promise === x) {
    return reject(new TypeError("Chaining cycle detected for promise"))
  }
  if( x instanceof DefPromise) {
    x.then(resolve, reject)
  } else {
    resolve(x)
  }
}

