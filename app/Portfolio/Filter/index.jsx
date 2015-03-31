import React from 'react/addons'
import {Link} from "react-router"
import {portfolio as Actions} from 'actions'
import _ from 'lodash'

import './filter.less';

//CONSTS
var QUERY_SEAR_THROT = null;

export default React.createClass({
    _clickListener(e) {
      if(e.target.classList.contains('glyphicon-search') || e.target.classList.contains('searchBar')) {
        //do nothing
      } else {
        this.setState({
          isSearching: false
        });
      }
    },
    propTypes: {
      currentProject : React.PropTypes.object
    },
    contextTypes: {
      router: React.PropTypes.func
    },
    cx(type) {
      if(type === this.state.type) {
        return 'active';
      }
      return '';
    },
    onSearch() {
      this.setState({
        isSearching: true
      });
    },
    componentDidMount(){
      window.addEventListener('click', this._clickListener, false);
      QUERY_SEAR_THROT = _.throttle((val) => {
        Actions.search(val);
      },500,{leading:false});
    },
    componentWillUnmount() {
      window.removeEventListener('click', this._clickListener, false);
    },
    onSearchChg(e) {
      var value = e.target.value;
      QUERY_SEAR_THROT(value);
    },
    componentDidUpdate() {
      if(this.state.isSearching) {
        document.querySelector('.searchBar').focus();
      }
    },
    sort(type) {
      Actions.filter(type);
      this.setState({
        type
      });
    },
    renderSearch() {
      if(!this.state.isSearching) {
        return <span className="glyphicon glyphicon-search" onClick={this.onSearch} />;
      }
      return <div className="searchWrapper"><span className="glyphicon glyphicon-search" /> <input type="text" placeholder="search..." className="searchBar" onChange={this.onSearchChg} /></div>;
    },
    renderBody() {
      return <div className="row">
        <div className="col-xs-12">
          <ul className="filterList" ref="filter">
            <li className={this.cx('all')}><a href="#" onClick={this.sort.bind(this,'all')}>All Projects</a></li>
            <li className={this.cx('web')}><a href="#" onClick={this.sort.bind(this,'web')}>Web Apps</a></li>
            <li className={this.cx('desktop')}><a href="#" onClick={this.sort.bind(this,'desktop')}>Desktop Apps</a></li>
            <li className={this.cx('mobile')}><a href="#" onClick={this.sort.bind(this,'mobile')}>Mobile Apps</a></li>
          </ul>
          <div className="actions">{this.renderSearch()}</div>
        </div>
      </div>;
    },
    getInitialState() {
      return {
        isSearching : null,
        type: 'all'
      };
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