import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

function Bar({title,xData,yData,style}) {
  const domRef = useRef()
  const chartInit = () => {
    var myChart = echarts.init(domRef.current);
    // 绘制图表
    myChart.setOption({
      title: {
        text: title
      },
      tooltip: {},
      xAxis: {
        data: xData
      },
      yAxis: {},
      series: [
        {
          name: '满意度',
          type: 'bar',
          data: yData
        }
      ]
    });
  }
  useEffect(()=>{
    chartInit()
  })
  return <div>
    <div ref={domRef} style={style}></div>
  </div>
}

export default Bar