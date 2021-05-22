import React from 'react'
import './pics.css'
import imgUrl from './OGC.gif'
import { Upload, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'


class PicList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [],
      imgs: [],
      file: {},
      sdw: ''
    }
    this.picWrap= React.createRef();
    this.scrollListen= React.createRef();


    this.getPic = this.getPic.bind(this)
    this.isScrolling = this.isScrolling.bind(this)
    this.loadPic = this.loadPic.bind(this)
    this.imgInfo = this.imgInfo.bind(this)
    this.uploadPic = this.uploadPic.bind(this)
  }
  componentDidMount(props){
    this.query()
  }
  async getPic(){
    if (!localStorage.pic_urls || (localStorage.picUpdateTime && +new Date().getTime() - +localStorage.picUpdateTime > 60000)) {
      this.query()
      
    } else {
      localStorage.pic_urls && await this.setStateSync({list: JSON.parse(localStorage.pic_urls)})
    }
    this.setStateSync({imgs: [...this.state.list.map((e, i) => (i< 15 ? e.download_url: imgUrl))]})
    
    setTimeout(() => {
      this.isScrolling()
    })
    localStorage.setItem('picUpdateTime', String(new Date().getTime()))
  }
  query = async () => {
    const res = await this.$axios.get('https://api.github.com/repos/towgate/towgate.github.io/contents/picRepo',
      {
        headers: {
          Authorization: 'token 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',
          Accept: 'application/vnd.github.v3+json'
        },

      })
      this.setStateSync({list: res.data})
      
      localStorage.setItem('pic_urls', JSON.stringify(this.state.list))
      this.setStateSync({imgs: [...this.state.list.map((e, i) => (i< 15 ? e.download_url: imgUrl))]})
    
    setTimeout(() => {
      this.isScrolling()
    })
    localStorage.setItem('picUpdateTime', String(new Date().getTime()))
  }
  async delPic (i, e) {
    // https://api.github.com/repos/towgate/towgate.github.io/contents/picRepo
      const res = await this.$axios.delete('https://api.github.com/repos/towgate/towgate.github.io/contents/picRepo/'+e.name,
      {
        headers: {
          Authorization: 'token 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',
          Accept: 'application/vnd.github.v3+json'
        },
        params: {
          owner: 'towgate',
          repo: 'towgate.github.io',
          path: 'picRepo/'+e.name,
          message: 'delete pic',
          sha: e.sha,
          master: 'master',
          committer: {name: 'huangweiye', email: '1712889857@qq.com'},
          author: {name: 'towgate', email: '1666920944@qq.com'},
        }
      })
      console.log(res)
      this.query()
  }
  setStateSync(obj){
    new Promise((res, rej) => {
      this.setState(obj, () => {
        res()
      })
    })
    
  }
  isScrolling () {
    this.scrollListen.current.addEventListener('scroll', this.debounce.call(this, this.loadPic))
  }
  loadPic () {
    if (!this.picWrap.current) return
    const imgs = [...this.picWrap.current.children]
      imgs.forEach((e, i) =>{
        const isShow = (this.scrollListen.current.scrollTop < e.offsetTop) && (e.offsetTop < this.scrollListen.current.scrollTop+this.scrollListen.current.offsetHeight)
        if (isShow) {
          const todoList = [...this.state.imgs.map((e, j) => j===i ? this.state.list[i].download_url: e )];
          this.setStateSync({imgs:  todoList})
        }
      })
  }
  uploadPic (e) {
    let f;
    if (e.target) {
      f = e.target.files[0]
    } else {
      f = e
    }
    const name = `p${Math.floor(new Date().getTime()/1000)}.${f.name.split('.')[f.name.split('.').length - 1]}`
    const file = new File([f], name,{type:f.type})
    console.log(file)
    // this.upload(file)
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async (e) => {
      let base64 = reader.result.split(',')
      // return;
      base64.splice(0, 1)
      this.setState({sdw: reader.result})
      const res = await this.$axios.put('https://api.github.com/repos/towgate/towgate.github.io/contents/picRepo/'+name,{
        message: 'upload pic ' + name,
        content: base64.join(''),
        // committer: {name: 'towgate', email: '1666920944@qq.com'},
        // author: {name: 'towgate', email: '1666920944@qq.com'},
      },
      {
        headers: {
          Authorization: 'token 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',
          Accept: 'application/vnd.github.v3+json'
        }
      })
      console.log(res.data)
    }
    
    return false
  }
  debounce (fn, timeout=500) {
    let timer = null
    return () => {
      timer && clearTimeout(timer)
      timer = setTimeout(fn, timeout)
    }
  }
  imgInfo (i, e) {
    console.log(i)
    console.log(this.picWrap.current.children[i].offsetTop)
    console.log(this.scrollListen.current.scrollTop)
    console.log(this.scrollListen.current.offsetHeight)
    console.log(e)
  }
  render () {
    return (
      <div ref={this.scrollListen} className="pic-list-wrap">
        <h1>图片瀑布</h1>
        <Upload showUploadList={false} beforeUpload={this.uploadPic}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        <input type="file" onChange={this.uploadPic}/>
        <img src={this.state.sdw} alt=""/>
        <br/>
        <div ref={this.picWrap} className="pic-list">
          { this.state.list.map((e, i) => (
          <div
            key={i}
            alt="pic"
            className="pic-item"
            style={{backgroundImage: `url(${this.state.imgs[i]})`}}
            onClick={this.imgInfo.bind(this, i, e)}
          >
            <button onClick={this.delPic.bind(this, i, e)} style={{padding: '4px 16px',borderRadius: '6px',border: 'none',margin: '10px auto'}}>del</button>
          </div>)) }
        </div>
      </div>
      
    )
  }
  
}




export default PicList;