import Reflux from "reflux";

// Main
export default {

  portfolio : Reflux.createActions({
    "load": {asyncResult: true},
    "search": {}
  })

};
