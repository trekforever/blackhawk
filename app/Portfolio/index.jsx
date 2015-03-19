import Reflux from "reflux"
import React from 'react/addons'
import {State as RouterState, RouteHandler} from "react-router"
import Header from './Header'
import Filter from './Filter'

import Store from 'stores/portfolio-store'

import './portfolio.less'

export default React.createClass({
  storeChangeListener(delta) {
    // {projects: arr, currentProject: obj}
    this.setState(delta);
  },
  getInitialState() {
    return {
      projects: (void 0)
    };
  },
  renderList() {
    if(!this.state.projects) {
      return <Spinner />;
    }
  },
  mixins: [Reflux.listenTo(Store, "storeChangeListener"), RouterState],
  render() {
      var projectId = this.getParams().id;
      return <div className="portfolio">
          <Header />
          <Filter currentProject={this.state.currentProject} />
          <RouteHandler projects={this.state.projects} currentProject={this.state.currentProject} />
      </div>;
  }
});
