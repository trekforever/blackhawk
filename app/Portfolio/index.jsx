import Reflux from "reflux"
import React from 'react/addons'
import {RouteHandler} from "react-router"
import {Link} from "react-router"
import Header from './Header'
import Filter from './Filter'
import Spinner from 'Spinner'
import ProjectList from './ProjectList'

import {portfolio as Actions} from 'actions'
import Store from 'stores/portfolio-store'

import './portfolio.less'

export default React.createClass({
  componentDidMount() {
    Actions.load();
  },
  storeChangeListener(delta) {
    this.setState({
      projects: delta
    });
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
    return <ProjectList projects={this.state.projects} />
  },
  mixins: [Reflux.listenTo(Store, "storeChangeListener")],
  render() {
      return <div className="portfolio">
          <Header />
          <Filter />
          { this.renderList() }
          <RouteHandler />
      </div>;
  }
});
