import Reflux from "reflux"
import {portfolio as Actions} from 'actions'
import request from 'request'
import _ from 'lodash'

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
    this.projects.all = resp.body;
    this.trigger({ projects: this.projects.all }); 
  },
  onLoadFailed(resp) {
    if(_.isString(resp)) {
      throw resp;
    } else {
      throw resp.error;
    }
  }
});