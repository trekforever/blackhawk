import Reflux from "reflux"
import {portfolio as Actions} from 'actions'
import request from 'request'
import _ from 'lodash'

export default Reflux.createStore({
  listenables: Actions,
  init() {
    this.projects = {
      cache: {},
      all: []
    }
  },
  onLoad() {
    // Send GET request to retrieve data from Firebase
    Actions.load.promise(request('GET', 'https://galaxy-wei.firebaseio.com/.json')
      .promise());
  },
  onLoadCompleted(resp) {
    // Parse body
    resp.body.forEach((project) => {
      this.projects.cache[_.kebabCase(project.title)] = project;
    });
    this.projects.all = resp.body;
    this.trigger(this.projects.all); //array of projects
  },
  onLoadFailed(resp) {
    throw resp.error;
  }
});