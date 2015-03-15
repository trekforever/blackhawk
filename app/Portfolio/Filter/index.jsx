import React from 'react/addons'
import {Link} from "react-router"
import Snabbt from "snabbt.js"

import './style.less';

export default React.createClass({
    componentDidMount() {
      Snabbt(this.getDOMNode(), {
        delay:1000,
        easing: 'ease',
        height: 49,
        fromHeight: 0,
        duration: 500,
      }).then({
        opacity: 1,
        fromOpacity: 0
      });
    },
    render() {
        return <div className="filter">
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <ul className="filterList">
                  <li className="active"><Link to="/portfolio">All Projects</Link></li>
                  <li><Link to="/portfolio?sort=web">Web Apps</Link></li>
                  <li><Link to="/portfolio?sort=desktop">Desktop Apps</Link></li>
                  <li><Link to="/portfolio?sort=mobile">Mobile Apps</Link></li>
                </ul>
                <div className="layout">
                  <div className="layout-toggle grid active"><i className="fa fa-th" /></div>
                  <div className="layout-toggle list"><i className="fa fa-th-list" /></div>
                </div>
              </div>
            </div>
          </div>
        </div>;
    }
});