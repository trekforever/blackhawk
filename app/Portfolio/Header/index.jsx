import React from 'react/addons'
import {Link} from "react-router"
import Snabbt from "snabbt.js"

import './style.less';

export default React.createClass({
    componentDidMount() {
      Snabbt(this.refs.titleMain.getDOMNode(), {
        delay:1000,
        easing: 'easeOut',
        position:[0,-5,0],
        duration: 1000
      });
      Snabbt(this.refs.titleSub.getDOMNode(), {
        delay:1500,
        easing: 'easeOut',
        opacity: 1,
        fromOpacity: 0,
        position:[0,-15,0],
        duration: 500
      });
    },
    render() {
        return <header className="portHeader">
            <div className="container">
                <img src={require("./assets/mainLogo.png")} className="portLogo" />
                <div className="title">
                    <h1 ref="titleMain"><Link to="/">Xin Wei</Link></h1>
                    <h4 ref="titleSub">Portfolio and Projects</h4>
                </div>
            </div>
        </header>;
    }
});