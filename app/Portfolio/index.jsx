import Reflux from "reflux"
import React from 'react/addons'
import _ from 'lodash'
import classNames from 'classNames'
import {RouteHandler} from "react-router"
import Header from './Header'
import Filter from './Filter'

import Store from 'stores/portfolio-store'

import './portfolio.less'

export default React.createClass({
  storeChangeListener(delta) {
    // {projects: arr, currentProject: obj}
    this.setState(delta);
  },
  contextTypes: {
    router: React.PropTypes.func
  },
  hideNotification() {
    this.setState({
      hideNotification: true
    });
  },
  getInitialState() {
    return {
      projects: (void 0),
      notification: false,
      hideNotification: false
    };
  },
  componentDidMount() {
    _.delay(() => {
      if(this.isMounted()) {
        this.setState({
          notification: true
        });
      }
    }, 1000)
  },
  cxCallout() {
    return classNames({
      'show': this.state.notification,
      'hide': this.state.hideNotification
    });
  },
  renderList() {
    if(!this.state.projects) {
      return <Spinner />;
    }
  },
  mixins: [Reflux.listenTo(Store, "storeChangeListener")],
  render() {
      var projectId = this.context.router.getCurrentParams().id;
      var filter = this.context.router.isActive('projectItem') ? (void 0) : <Filter currentProject={this.state.currentProject} />;
      return <div className="portfolio">
          <Header />
          { filter }
          <div className={'bs-callout ' + this.cxCallout()}>
            <div className="exit" onClick={this.hideNotification}><span className="glyphicon glyphicon-remove"></span></div>
            <h4>Work in Progress</h4>
            <p>Just a heads up, this portfolio is still a work in progress! Don&#039;t expect all features/functions to be working yet! </p>
          </div>
          <RouteHandler projects={this.state.projects} currentProject={this.state.currentProject} />
      </div>;
  }
});
