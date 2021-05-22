import { Menu } from 'antd';
import { HomeOutlined, AppstoreOutlined, EditOutlined } from '@ant-design/icons';
import { HashRouter as Link } from "react-router-dom";
import { withRouter } from "react-router-dom";


const { SubMenu } = Menu;
function Top(){
  return (
    <Menu mode="horizontal" theme="dark">
        <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link to="/">首页</Link>
        </Menu.Item>
        <Menu.Item key="app" icon={<EditOutlined />}>
        <Link to="/blogs">Blog</Link>
        </Menu.Item>
        <SubMenu key="Demo" icon={<AppstoreOutlined />} title="Demo">
          <Menu.ItemGroup title="Web">
            <Menu.Item key="pics"><Link to="/pics">PicList</Link></Menu.Item>
            <Menu.Item key="songs"><Link to="/songs">Player</Link></Menu.Item>
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
  )
}
export default withRouter(Top)