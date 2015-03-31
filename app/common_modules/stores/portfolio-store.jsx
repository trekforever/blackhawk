import Reflux from "reflux"
import {portfolio as Actions} from 'actions'
import request from 'request'
import _ from 'lodash'
import Immutable from 'immutable'

const BASE_API = "https://galaxy-wei.firebaseio.com";

export default Reflux.createStore({
  listenables: Actions,
  init() {
    this.projects = {
      cache: {},
      all: [],
      currentProject: null
    }
    this.promises = [];
  },
  onLoadProject(id) {
    //check cache
    if(this.projects.cache[id]) {
      // cache hit
      this.trigger({currentProject: this.projects.cache[id]});
    } else {
      // cache miss
      Actions.load().then(() => {
        //get project from cache now
        this.trigger({currentProject: this.projects.cache[id]});
      });
    }
  },
  onUnloadProject(id) {
    this.trigger({currentProject: null});
  },
  onLoad() {
    // Send GET request to retrieve data from Firebase
    Actions.load.promise(request('GET', `${BASE_API}/.json`).promise());
  },
  onLoadCompleted(resp) {
    // all projects
    resp.body.forEach((project) => {
      this.projects.cache[_.kebabCase(project.title)] = project;
    });
    this.projects.all = Immutable.fromJS(resp.body);
    this.trigger({ projects: resp.body }); 
  },
  onLoadFailed(resp) {
    if(_.isString(resp)) {
      throw resp;
    } else {
      throw resp.error;
    }
  },
  onSearch(query) {
    console.log('search',query);
    var results = this.projects.all.filter(x => x.get('title').toLowerCase().indexOf(query.toLowerCase()) >= 0);
    this.trigger({
      projects: results.toJS()
    });
  },
  onFilter(type) {
    var results;
    if(type === "all") {
      // return all
      results = this.projects.all;
    } else {
      results = this.projects.all.filter(x => x.get('type').toLowerCase().indexOf(type.toLowerCase()) >= 0);
    }
    this.trigger({
      projects: results.toJS()
    });
  }
});