var React = require("react");
var Router = require("react-router");
var routes = require("../../app/routes");

// react-router handles location
Router.run(routes, Router.HistoryLocation, function(Application, state) {
    React.render(<Application />, document.getElementById("content"));
});
