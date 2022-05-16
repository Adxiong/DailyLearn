/*
 * @Description:
 * @version:
 * @Author: Adxiong
 * @Date: 2022-05-16 22:08:59
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-05-16 22:40:51
 */
import { memo } from 'react';
import ReactECharts from 'echarts-for-react';

interface Props {
  options: any;
  onChange?: (name: string, data: number) => void;
  onSelect?: (index: number) => void;
}
const Child = memo(({ options, onSelect, onChange }: Props) => {
  const handleClickData = (param) => {
    onChange && onChange(param.name, param.data);
  };
  const handleSelectData = (param) => {
    onSelect && onSelect(param.dataIndexInside);
  };
  return (
    <ReactECharts option={options} onEvents={{ select: handleSelectData }} />
  );
});

export default Child;
