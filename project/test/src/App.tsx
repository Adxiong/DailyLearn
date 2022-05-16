/*
 * @Description:
 * @version:
 * @Author: Adxiong
 * @Date: 2022-05-16 21:57:16
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-05-16 22:41:24
 */
import { useCallback, useState } from 'react';
import './App.css';
import ReactECharts from 'echarts-for-react';
import Child from './child';

function App() {
  const [options, setOptions] = useState({
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true,
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  });
  const [options2, setOptions2] = useState({
    title: {
      text: 'ECharts 入门示例',
    },
    tooltip: {},
    xAxis: {
      data: ['衬衫', '222'],
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [1000, 80],
      },
    ],
  });

  const handleDataChange = useCallback(
    (name: string, data: number) => {
      console.log(name, data);
      const newOptions = { ...options2 };
      newOptions.xAxis.data = [name];
      newOptions.series[0].data = [data];
      setOptions2(newOptions);
    },
    [options2]
  );

  const handleDataSelect = useCallback(
    (index: number) => {
      const name = options.xAxis.data[index];
      const data = options.series[0].data[index];

      const newOptions = { ...options2 };
      newOptions.xAxis.data = [name];
      newOptions.series[0].data = [data];

      setOptions2(newOptions);
    },
    [options2]
  );
  return (
    <div className="App">
      <Child
        options={options}
        onChange={handleDataChange}
        onSelect={handleDataSelect}
      />
      <Child options={options2}></Child>
    </div>
  );
}

export default App;
