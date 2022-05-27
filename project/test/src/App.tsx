/*
 * @Description:
 * @version:
 * @Author: Adxiong
 * @Date: 2022-05-16 21:57:16
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-05-27 12:09:54
 */
import { useCallback, useEffect, useState } from 'react';
import './App.css';
import ReactECharts from 'echarts-for-react';
import Child from './child';

function App() {
  const [count, setCount] = useState(-1);
  useEffect(() => {
    setCount(0);
  });

  console.log('render');

  return <div className="App">{count}</div>;
}

export default App;
