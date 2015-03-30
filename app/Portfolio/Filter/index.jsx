import React from 'react/addons'
import {Link} from "react-router"

import './filter.less';

export default React.createClass({
    propTypes: {
      currentProject : React.PropTypes.object
    },
    contextTypes: {
      router: React.PropTypes.func
    },
    cx(type) {
      var sort = this.context.router.getCurrentQuery().sort;

      if(!sort) {
        if(type==="all") { return "active"; }
        return ;
      }
      if(sort.indexOf(type) >= 0) {
        return 'active';
      }
    },
    renderBody() {
      return <div className="row">
        <div className="col-xs-12">
          <ul className="filterList" ref="filter">
            <li className={this.cx('all')}><Link to="/portfolio?sort=all">All Projects</Link></li>
            <li className={this.cx('web')}><Link to="/portfolio?sort=web">Web Apps</Link></li>
            <li className={this.cx('desktop')}><Link to="/portfolio?sort=desktop">Desktop Apps</Link></li>
            <li className={this.cx('mobile')}><Link to="/portfolio?sort=mobile">Mobile Apps</Link></li>
          </ul>
        </div>
      </div>;
    },
    render() {
      if(this.context.router.isActive('projectItem')) {
        return <div></div>;
      }
      return <div className="filter">
        <div className="container">
          { this.renderBody() }
        </div>
      </div>;
    }
});