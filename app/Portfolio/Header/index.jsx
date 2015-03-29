import React from 'react/addons'
import {Link} from "react-router"
import Snabbt from "snabbt.js"

import './header.less';

export default React.createClass({
    componentDidMount() {
      Snabbt(React.findDOMNode(this.refs.titleMain), {
        delay:1000,
        easing: 'easeOut',
        position:[0,-10,0],
        duration: 500
      });
      Snabbt(React.findDOMNode(this.refs.titleSub), {
        delay:1500,
        easing: 'easeOut',
        opacity: 1,
        fromOpacity: 0,
        position:[0,-25,0],
        duration: 500
      });
    },
    render() {
        return <header className="portHeader">
            <div className="container">
                <img src={require("./assets/mainLogo.png")} className="portLogo" />
                <div className="title">
                    <h1 ref="titleMain"><Link to="/">Xin Wei</Link></h1>
                    <h4 ref="titleSub"><Link to="/portfolio">Portfolio and Projects</Link></h4>
                </div>
            </div>
        </header>;
    }
});