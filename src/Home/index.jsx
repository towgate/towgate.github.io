import React from 'react'
import {Tooltip} from 'antd'
import './home.css'

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      type: ['加载','爱情','道德','青春','愿望','集体','理想','志向','人才','谦虚','人格','天才','青年','社会','国家','财富','智慧','修养','工作','妇女','儿童','思想','理智','学习','科学','信仰','诚信','读书','成败','奉献','劳动','节约','教育','企业','事业','时间','勤奋','民族','真理','友谊','自由','心理','心灵','人生','幸福','团结'],
      url: '',
      desc: '',
      sentence: {
        author: "程序员",
        content: "天台的风好大啊，测试我带你去吹吹？",
        typeid: '0',
        type: '加载'
      },
      time: new Date()
    }
  }
  componentDidMount(){
    this.getPic()
    this.getSentence()
    setInterval(() => {
      this.setState({time: new Date()})
    }, 1000)
  }
  getPic = () => {
    this.$axios.get('https://api.no0a.cn/api/bing/0').then(res => {
      this.setState({
        'url': res.data.bing.url,
        'desc': res.data.bing.copyright
      })
    })
  } 
  getSentence = () => {
    this.$axios.get('https://v1.alapi.cn/api/mingyan', 
    {
      typeid: Math.floor(Math.random()*44)+1
    }).then(res => {
      const data = res.data.data
      data.type = this.state.type[data.typeid]
      this.setState({sentence: data})
    })
  } 
  render() {
    return (
     <div className="bg-wrap" style={{backgroundImage: `url(${this.state.url})`}}>
       <h1 style={{paddingTop: '120px'}}>
        {/* <div>
          {
       `${this.state.time.getFullYear()} -
       ${this.state.time.getMonth()+1} -
       ${this.state.time.getDate()}
       `
       }
        </div>
        <span >{`
       ${this.state.time.getHours()} :
       ${this.state.time.getMinutes()} :
       ${this.state.time.getSeconds()}
      `}</span> */}
      {/* <div>{this.state.time.toLocaleDateString()}</div> */}
      <div>{this.state.time.toDateString()}</div>
      <span>{this.state.time.toLocaleTimeString()}</span>
      {/* <span>{this.state.time.toTimeString()}</span> */}
      {/* <span>{this.state.time.toLocaleString()}</span> */}
      {/* <span>{this.state.time.toUTCString()}</span> */}
      {/* <span>{this.state.time.toString()}</span> */}
       </h1>
      
       <Tooltip placement="bottomRight" color="rgba(0,0,0,.5)" title={` —— ${this.state.sentence.author}[${this.state.sentence.type}]`}>
         <span className="sentence">{this.state.sentence.content}</span>
       </Tooltip>
       
       <span className="bg-desc">{this.state.desc}</span>
     </div>
    )
  }
}



export default Home;