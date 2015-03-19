import React from 'react/addons'
import {Link} from "react-router"
import {State as RouterState} from "react-router"
import Snabbt from "snabbt.js"

import './filter.less';

export default React.createClass({
    propTypes: {
      currentProject : React.PropTypes.object
    },
    componentDidMount() {
      Snabbt(this.getDOMNode(), {
        delay:2000,
        easing: 'ease',
        height: 49,
        fromHeight: 0,
        duration: 500,
      }).then({
        opacity: 1,
        fromOpacity: 0
      });
    },
    componentDidUpdate() {
      if(this.isActive('projectItem')) {
        if(!this.props.currentProject) {
          return ;
        }
        Snabbt(this.refs.title.getDOMNode(), {
          opacity: 1,
          fromOpacity: 0
        })
      } else {
        Snabbt(this.refs.filter.getDOMNode(), {
          opacity: 1,
          fromOpacity: 0
        })
      }
    },
    renderBody() {
      // individual project
      if(this.isActive('projectItem')) {
        if(this.props.currentProject) {
          return <div className="row"><div className="col-xs-12"><h1 className="title" ref="title">{this.props.currentProject.title}</h1></div></div>;
        } else {
          return <div></div>;
        }
      }
      return <div className="row">
        <div className="col-xs-12">
          <ul className="filterList" ref="filter">
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
      </div>;
    },
    mixins: [RouterState],
    render() {
        return <div className="filter">
          <div className="container">
            { this.renderBody() }
          </div>
        </div>;
    }
});