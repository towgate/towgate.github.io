import FooterContent from './FooterContent';
import { HashRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import React,{Component} from 'react';

import { Menu } from 'antd';
import { HomeOutlined, AppstoreOutlined, EditOutlined } from '@ant-design/icons';
import Home from './Home/index';



import Blog from './Blog';
import PicList from './Web/PicList/index';
import Player from './Web/Player';
import Drawer from './Canvas/Drawer';
import Dot from './Canvas/Dot';
import Author from './Author';
const { SubMenu } = Menu;




// function App(props) {
//   const {history} = props
//   console.log(history)
//   let [current, setCurrent] = useState('home')
//   const handleClick =  (e) => {
//     setCurrent(e.key)
//   }
//   return (
//     <div className="App false-fix">
//       <Router>
//       <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" theme="dark">
//         <Menu.Item key="home" icon={<HomeOutlined />}>
//         <Link to="/">首页</Link>
//         </Menu.Item>
//         <Menu.Item key="app" icon={<EditOutlined />}>
//         <Link to="/blogs">Blog</Link>
//         </Menu.Item>
//         <SubMenu key="Demo" icon={<AppstoreOutlined />} title="Demo">
//           <Menu.ItemGroup title="Web">
//             <Menu.Item key="pics"><Link to="/pics">PicList</Link></Menu.Item>
//             <Menu.Item key="songs"><Link to="/songs">Player</Link></Menu.Item>
//           </Menu.ItemGroup>
//           <Menu.ItemGroup title="Canvas">
//             <Menu.Item key="drawer"><Link to="/canvas/drawer">画板</Link></Menu.Item>
//             <Menu.Item key="dot"><Link to="/canvas/dot">粒子效果</Link></Menu.Item>
//           </Menu.ItemGroup>
//         </SubMenu>
//         <Menu.Item key="author">
//         <Link to="/author">关于我</Link>
//         </Menu.Item>
//       </Menu>
//         <div className="fix-content">
//           <Route exact path="/" component={Home} />
//           <Route path="/blogs" component={Blog} />    
//           <Route path="/pics" component={PicList} />   
//           <Route path="/songs" component={Player} />   
//           <Route path="/canvas/drawer" component={Drawer} />   
//           <Route path="/canvas/dot" component={Dot} />   
//           <Route path="/author" component={Author} />
//         </div>
//     </Router>
//       <FooterContent />
      
//     </div>
//   );
// }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "my first react",
      key: 'home',
    };
    const keyArr = window.location.pathname.split('/')
    this.state.key = keyArr[keyArr.length - 1] || 'home'


    this.handleClick = this.handleClick.bind(this)

  }
  handleClick(e){
    this.setState({'key': e.key})
  }
  render() {
    return (
    <div className="App false-fix">
      <Router>
      <Menu onClick={this.handleClick} mode="horizontal" theme="dark" defaultSelectedKeys={[this.state.key]}>
        <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link to="/">首页</Link>
        </Menu.Item>
        <Menu.Item key="blogs" icon={<EditOutlined />}>
        <Link to="/blogs">Blog</Link>
        </Menu.Item>
        <SubMenu key="Demo" icon={<AppstoreOutlined />} title="Demo">
          <Menu.ItemGroup title="Web">
            <Menu.Item key="pics"><Link to="/web/pics">PicList</Link></Menu.Item>
            <Menu.Item key="songs"><Link to="/web/songs">Player</Link></Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Canvas">
            <Menu.Item key="drawer"><Link to="/canvas/drawer">画板</Link></Menu.Item>
            <Menu.Item key="dot"><Link to="/canvas/dot">粒子效果</Link></Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <Menu.Item key="author">
        <Link to="/author">关于我</Link>
        </Menu.Item>
      </Menu>
        <div className="fix-content">
          <Route exact path="/" component={Home} />
          <Route path="/blogs" component={Blog} />    
          <Route path="/web/pics" component={PicList} />   
          <Route path="/web/songs" component={Player} />   
          <Route path="/canvas/drawer" component={Drawer} />   
          <Route path="/canvas/dot" component={Dot} />   
          <Route path="/author" component={Author} />
        </div>
    </Router>
      <FooterContent />
      
    </div>
  );
  }
 
}

export default App;
