
import React, { Component } from 'react';

class Player extends Component {
    componentDidMount(){
        //获取动态路由传参需要在生命周期内，但是不一定是当前生命周期
        //获取传参，aid对应的是app.jsx中的path="/content/:aid"
        console.log(this.props.match.params.aid);
    }
    render() {
        return (
            <div>
                cssss
            </div>
        );
    }
}

export default Player;