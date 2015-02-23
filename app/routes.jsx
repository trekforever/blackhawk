var React = require("react");
var Router = require("react-router");
var {Route, DefaultRoute} = Router;

// polyfill
if(!Object.assign)
    Object.assign = React.__spread;

// export routes
module.exports = (
    <Route name="app" path="/" handler={require("./Application")}>
        <Route name="portfolio" path="/portfolio" handler={require('./Portfolio')}>
            <Route name="projectItem" path="/portfolio/projects/:id" handler={require('./Portfolio/ProjectItem')} />
            <DefaultRoute name="list" handler={require('./Portfolio/ProjectList')} /> 
        </Route>
        <DefaultRoute name="home" handler={require("./Home")} />
    </Route>
);
