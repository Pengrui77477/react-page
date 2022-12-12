import './index.scss'
import Bar from '@/components/Bar'
function Home() {
  return <div>
    <Bar
      title='主流框架使用满意度'
      xData={['React', 'Vue', 'Angular']}
      yData={[8,9,8]}
      style={{width:'500px',height:'400px'}}
    ></Bar>
  </div>
}

export default Home