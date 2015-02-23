var React = require("react");
var Router = require("react-router");
var routes = require("../../app/routes");
var html = require("../../app/prerender.html");

module.exports = function(path, readItems, scriptUrl, styleUrl, commonsUrl, callback) {

    // run the path thought react-router
    Router.run(routes, path, function(Application, state) {
        var application = React.renderToString(<Application />);
        callback(null, html
            .replace("STYLE_URL", styleUrl)
            .replace("SCRIPT_URL", scriptUrl)
            .replace("COMMONS_URL", commonsUrl)
            .replace("CONTENT", application));
    });
};
